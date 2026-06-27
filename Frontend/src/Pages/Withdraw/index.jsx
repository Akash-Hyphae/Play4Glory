import React, { useEffect, useState } from "react";
import api from "../../Api/axios";
import { Link } from "react-router-dom";
import { FaMoneyBillWave, FaPaperPlane } from "react-icons/fa";

const Withdraw = () => {
  const [walletBalance, setWalletBalance] = useState(0);

  const [amount, setAmount] = useState("");

  const [upiId, setUpiId] = useState("");

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  // const token = localStorage.getItem("token");

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  // ===============================
  // Fetch Wallet + Requests
  // ===============================

  const fetchData = async () => {
    try {
      const [walletRes, requestRes] = await Promise.all([
        api.get("/users/wallet"),
        api.get("/withdraw/my-requests"),
      ]);

      setWalletBalance(walletRes.data.walletBalance);

      setRequests(requestRes.data.requests);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===============================
  // Withdraw Request
  // ===============================

  const handleWithdraw = async () => {
    if (!amount || !upiId) {
      return alert("Please fill all fields");
    }

    if (Number(amount) <= 0) {
      return alert("Invalid amount");
    }

    try {
      await api.post("/withdraw", {
        amount: Number(amount),
        upiId,
      });

      alert("Withdraw request submitted successfully.");

      setAmount("");
      setUpiId("");

      fetchData();
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("playerToken");
        localStorage.removeItem("playerName");
        window.location.href = "/login";
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex justify-center items-center">
        <h1 className="text-3xl font-bold text-cyan-400">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-8 py-10">
      <Link to="/profile" className="text-cyan-400 hover:text-cyan-300">
        ← Back to Profile
      </Link>

      <h1 className="text-4xl font-bold text-cyan-400 mt-6">Withdraw Money</h1>

      {/* Wallet */}

      <div className="mt-8 bg-[#10131f] rounded-2xl border border-cyan-700 p-6 shadow-[0_0_20px_rgba(0,255,255,.15)]">
        <div className="flex items-center gap-3">
          <FaMoneyBillWave className="text-3xl text-cyan-400" />

          <div>
            <p className="text-gray-400">Available Balance</p>

            <h2 className="text-4xl font-bold text-green-400">
              ₹{walletBalance}
            </h2>
          </div>
        </div>
      </div>

      {/* Withdraw Form */}

      <div className="mt-10 bg-[#10131f] rounded-2xl border border-cyan-700 p-6">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
          Withdraw Request
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-300">Amount</label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="w-full bg-[#1a2033] border border-cyan-700 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">UPI ID</label>

            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
              className="w-full bg-[#1a2033] border border-cyan-700 rounded-lg px-4 py-3 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleWithdraw}
          className="
            mt-8
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            font-bold
            px-8
            py-3
            rounded-xl
            flex
            items-center
            gap-3
            transition
          "
        >
          <FaPaperPlane />
          Submit Request
        </button>
      </div>
      {/* Withdraw History */}

      <div className="mt-10 bg-[#10131f] rounded-2xl border border-cyan-700 p-6">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
          Withdraw History
        </h2>

        {requests.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No withdraw requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-cyan-700">
                <tr className="text-cyan-400">
                  <th className="text-left py-4">Amount</th>

                  <th className="text-left py-4">UPI ID</th>

                  <th className="text-center py-4">Status</th>

                  <th className="text-center py-4">Requested On</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => (
                  <tr
                    key={request._id}
                    className="border-b border-gray-800 hover:bg-[#131929] transition"
                  >
                    <td className="py-5 font-semibold text-white">
                      ₹{request.amount}
                    </td>

                    <td className="text-gray-300">{request.upiId}</td>

                    <td className="text-center">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold
                        ${
                          request.status === "approved"
                            ? "bg-green-600 text-white"
                            : request.status === "pending"
                              ? "bg-yellow-500 text-black"
                              : "bg-red-600 text-white"
                        }`}
                      >
                        {request.status.toUpperCase()}
                      </span>
                    </td>

                    <td className="text-center text-gray-400">
                      {new Date(request.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdraw;
