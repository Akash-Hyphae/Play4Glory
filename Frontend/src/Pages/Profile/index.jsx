import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";

const fakeUser = {
  name: "Akash Singh",
  BgmiID: 1234567890,
  walletBalance: 1250,
  scrimsPlayed: 18,
  tournamentsPlayed: 7,
  totalWinnings: 5400,
  totalWithdraw: 1200,
  avatar: "avatar.jpg",
};

const matches = [
  { name: "BGMI Pro League", type: "Squad",Date: "13-4-26", time: "8:00 PM" },
  { name: "Scrim Night", type: "Duo",Date: "14-4-26", time: "10:30 PM" },
  { name: "Weekend Clash", type: "Solo",Date: "15-4-26", time: "6:00 PM" },
  { name: "BGMI Pro League", type: "Squad",Date: "16-5-26", time: "8:00 PM" },
  { name: "Scrim Night", type: "Duo",Date: "16-6-26", time: "10:30 PM" },
  { name: "Weekend Clash", type: "Solo",Date: "17-4-26", time: "6:00 PM" },
  { name: "BGMI Pro League", type: "Squad",Date: "23-4-26", time: "8:00 PM" },
  { name: "Scrim Night", type: "Duo",Date: "23-4-26", time: "10:30 PM" },
  { name: "Weekend Clash", type: "Solo",Date: "30-4-26", time: "6:00 PM" },
  { name: "BGMI Pro League", type: "Squad",Date: "23-4-26", time: "8:00 PM" },
];

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(fakeUser);
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#031225] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Back */}
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition">
          ← Back to Home
        </Link>

        {/* MAIN GRID → 50-50 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT SECTION */}
          <div className="space-y-6">

            {/* Profile */}
            <div className="flex items-center gap-5 p-6 rounded-2xl border border-cyan-500/30
              bg-[#020617]/60 backdrop-blur-md
              shadow-[0_0_25px_rgba(0,255,255,0.12)]">

              <img
                src={user.avatar}
                alt="profile"
                className="w-20 h-20 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_cyan]"
              />

              <div>
                <h1 className="text-2xl font-semibold tracking-wide">
                  {user.name}
                </h1>
                <p className="text-gray-400 text-sm">
                  #{user.BgmiID}
                </p>
              </div>
            </div>

            {/* Wallet */}
            <div className="p-6 rounded-2xl border border-cyan-500/30
              bg-[#020617]/60 backdrop-blur-md
              shadow-[0_0_25px_rgba(0,255,255,0.1)]">

              <div className="flex items-center gap-3 text-cyan-400 mb-3">
                <FaWallet />
                <span className="text-lg font-medium">Wallet Balance</span>
              </div>

              <p className="text-4xl font-bold text-cyan-300 mb-5">
                ₹{user.walletBalance}
              </p>

              <div className="flex gap-4">
                <button className="px-5 py-2 rounded-lg border border-cyan-400 text-cyan-300
                  hover:bg-cyan-400 hover:text-black transition shadow-[0_0_10px_cyan]">
                  Add Money
                </button>

                <button className="px-5 py-2 rounded-lg border border-cyan-400 text-cyan-300
                  hover:bg-cyan-400 hover:text-black transition">
                  Withdraw
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              <StatCard title="Tournaments Played" value={user.tournamentsPlayed} />
              <StatCard title="Scrims Played" value={user.scrimsPlayed} />
              <StatCard title="Total Winnings" value={`₹${user.totalWinnings}`} />
              <StatCard title="Total Withdraw" value={`₹${user.totalWithdraw}`} />
            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="p-6 rounded-2xl border border-cyan-500/30
            bg-[#020617]/60 backdrop-blur-md
            shadow-[0_0_25px_rgba(0,255,255,0.1)] h-fit">

            <h2 className="text-lg font-semibold mb-4 text-cyan-300">
              Upcoming Matches
            </h2>

            {/* TABLE */}
            <div className="overflow-hidden rounded-lg border border-cyan-500/20">
              <table className="w-full text-sm">

                <thead className="bg-cyan-500/10 text-cyan-300">
                  <tr>
                    <th className="p-3 text-left">Tournament</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                  </tr>
                </thead>

                <tbody>
                  {matches.map((m, i) => (
                    <tr
                      key={i}
                      className="border-t border-gray-700 hover:bg-cyan-500/5 transition"
                    >
                      <td className="p-3">{m.name}</td>

                      <td className="p-3">
                        <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 text-xs">
                          {m.type}
                        </span>
                      </td>
                      
                      <td className="p-3 text-gray-400">{m.Date}</td>

                      <td className="p-3 text-gray-400">{m.time}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* 🔹 Stat Card */
function StatCard({ title, value }) {
  return (
    <div className="p-5 rounded-xl border border-cyan-500/30
      bg-[#020617]/60 backdrop-blur-md
      shadow-[0_0_20px_rgba(0,255,255,0.08)]
      hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]
      transition">

      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-xl font-semibold text-cyan-300 mt-1">{value}</p>
    </div>
  );
}