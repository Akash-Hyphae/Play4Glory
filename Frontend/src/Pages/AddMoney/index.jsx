import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Api/axios";
import { FaWallet } from "react-icons/fa";

const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  // const token = localStorage.getItem("token");

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  // ===============================
  // Create Razorpay Order
  // ===============================

  const handlePayment = async () => {
    if (!amount || Number(amount) < 10) {
      return alert("Minimum amount is ₹10");
    }

    setLoading(true);

    try {
      const res = await api.post("/payment/create-order", {
        amount: Number(amount),
      });

      const order = res.data.order;

      // Razorpay popup will be opened in Part 2
      const options = {
        key: razorpayKey,

        amount: order.amount,

        currency: order.currency,

        name: "Play4Glory",

        description: "Wallet Recharge",

        image: "/logo.png",

        order_id: order.id,

        handler: async function (response) {
          try {
            await api.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Payment Successful!");

            window.location.href = "/profile";
          } catch (error) {
            console.log(error);

            alert(
              error.response?.data?.message || "Payment Verification Failed",
            );
          }
        },

        prefill: {
          name: "Player",
          email: "",
        },

        notes: {
          app: "Play4Glory",
        },

        theme: {
          color: "#06B6D4",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

      razor.on("payment.failed", function (response) {
        alert(response.error.description);

        console.log(response.error);
      });

      setLoading(false);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Unable to create order");

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-8 py-10">
      <Link to="/profile" className="text-cyan-400 hover:text-cyan-300">
        ← Back to Profile
      </Link>

      <div className="max-w-2xl mx-auto mt-10">
        {/* Card */}

        <div
          className="
            bg-[#10131f]
            rounded-2xl
            border
            border-cyan-700
            p-8
            shadow-[0_0_25px_rgba(0,255,255,.15)]
          "
        >
          {/* Heading */}

          <div className="flex items-center gap-4 mb-8">
            <FaWallet className="text-5xl text-cyan-400" />

            <div>
              <h1 className="text-4xl font-bold text-cyan-400">Add Money</h1>

              <p className="text-gray-400">
                Secure payments powered by Razorpay
              </p>
            </div>
          </div>

          {/* Quick Amount */}

          <h2 className="text-xl font-semibold text-cyan-300 mb-5">
            Select Amount
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {quickAmounts.map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value)}
                className={`
                    py-4
                    rounded-xl
                    border
                    font-bold
                    transition
                    ${
                      Number(amount) === value
                        ? "bg-cyan-500 text-black border-cyan-500"
                        : "border-cyan-700 hover:bg-cyan-500 hover:text-black"
                    }
                `}
              >
                ₹{value}
              </button>
            ))}
          </div>

          {/* Divider */}

          <div className="my-8 border-t border-cyan-900"></div>

          {/* Custom Amount */}

          <label className="block mb-3 text-lg text-gray-300">
            Or Enter Custom Amount
          </label>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="
                w-full
                bg-[#1a2033]
                border
                border-cyan-700
                rounded-xl
                px-5
                py-4
                outline-none
                text-xl
            "
          />

          {/* Payment Button */}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="
                w-full
                mt-8
                py-4
                rounded-xl
                bg-cyan-500
                hover:bg-cyan-400
                text-black
                font-bold
                text-lg
                transition
                disabled:opacity-50
            "
          >
            {loading ? "Creating Order..." : `Pay ₹${amount || 0}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMoney;
