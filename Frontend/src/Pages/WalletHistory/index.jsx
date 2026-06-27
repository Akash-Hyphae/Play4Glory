import { useEffect, useState } from "react";
import api from "../../Api/axios";
import { Link } from "react-router-dom";

const WalletHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // const token = localStorage.getItem("token");

      // const res = await api.get(
      //     "/wallet/history",
      //     {
      //         headers: {
      //             Authorization: `Bearer ${token}`,
      //         },
      //     }
      // );

      const res = await api.get("/wallet/history");

      setTransactions(res.data.transactions);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("playerToken");
        localStorage.removeItem("playerName");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-center">
        <h1 className="text-cyan-400 text-3xl">Loading Wallet...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10">
      <Link to="/profile" className="text-cyan-400">
        ← Back
      </Link>

      <h1 className="text-4xl font-bold text-cyan-400 mt-6 mb-10">
        Wallet History
      </h1>

      <div className="overflow-hidden rounded-xl border border-cyan-700">
        <table className="w-full">
          <thead className="bg-cyan-900">
            <tr>
              <th className="p-4 text-left">Type</th>

              <th className="p-4 text-left">Amount</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-700 hover:bg-cyan-950"
              >
                <td className="p-4 capitalize">{item.type}</td>

                <td
                  className={`p-4 font-semibold ${
                    item.type === "deposit" || item.type === "winnings"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ₹{item.amount}
                </td>

                <td className="p-4 capitalize">{item.status}</td>

                <td className="p-4">{item.description}</td>

                <td className="p-4">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div className="text-center mt-12 text-gray-400">
          No Transactions Yet
        </div>
      )}
    </div>
  );
};

export default WalletHistory;
