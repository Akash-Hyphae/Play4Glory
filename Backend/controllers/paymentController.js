const razorpay = require("../Config/razorpay");
const crypto = require("crypto");
const User = require("../models/user");
const WalletTransaction = require("../models/walletTransaction");
const Payment = require("../models/payment");

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (amount < 10 || amount > 100000) {
      return res.status(400).json({
        message: "Amount should be between ₹10 and ₹100000",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      user: req.user._id,
      razorpayOrderId: order.id,
      amount,
    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment Verification Failed",
      });
    }

    const payment = await Payment.findOne({
      
      razorpayOrderId: razorpay_order_id,
    });

    console.log("Payment:", payment);

    if (!payment) {
      return res.status(404).json({
        message: "Payment Record Not Found",
      });
    }

    if (payment.status === "paid") {
      return res.status(400).json({
        message: "Payment Already Verified",
      });
    }

    if (payment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized Payment Access",
      });
    }

    const user = await User.findById(req.user._id);
    console.log("User:", user);

    user.walletBalance += payment.amount;

    await user.save();

    payment.status = "paid";

    await payment.save();

    await WalletTransaction.create({
      user: req.user._id,
      amount: payment.amount,
      type: "deposit",
      status: "completed",
      description: "Money Added via Razorpay",
    });

    res.status(200).json({
      success: true,
      message: "Payment Verified",
      walletBalance: user.walletBalance,
    });
  } catch(error){

    console.log(error);

    res.status(500).json({
        message:error.message
    });

}
};

module.exports = {
  createOrder,
  verifyPayment,
};
