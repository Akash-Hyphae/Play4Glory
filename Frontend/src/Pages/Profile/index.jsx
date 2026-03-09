import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWallet, FaTrophy, FaGamepad } from "react-icons/fa";

// 🔹 Fake logged-in user data
const fakeUser = {
  name: "Akash Singh",
  walletBalance: 1250,
  scrimsPlayed: 18,
  tournamentsPlayed: 7,
  totalWinnings: 5400,
  avatar: "https://i.pravatar.cc/150?img=12",
};

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(fakeUser);
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Back */}
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition">
          ← Back to Home
        </Link>

        {/* Profile Header */}
        <div className="bg-[#020617] border border-cyan-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-[0_0_25px_rgba(0,255,255,0.15)]">
          <img
            src={user.avatar}
            alt="profile"
            className="w-24 h-24 rounded-full border-2 border-cyan-400"
          />

          <div className="text-center md:text-left">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-gray-400 text-sm">Play4Glory Player</p>
          </div>
        </div>

        {/* Wallet */}
        <div className="bg-[#020617] border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.12)]">
          <div className="flex items-center gap-3 mb-4 text-cyan-400">
            <FaWallet />
            <h2 className="text-lg font-semibold">Wallet Balance</h2>
          </div>

          <div className="text-3xl font-bold text-cyan-300 mb-5">
            ₹{user.walletBalance}
          </div>

          <div className="flex gap-4">
            <button className="px-5 py-2 rounded-lg border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition">
              Add Money
            </button>

            <button className="px-5 py-2 rounded-lg border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition">
              Withdraw
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<FaGamepad />} title="Scrims Played" value={user.scrimsPlayed} />
          <StatCard icon={<FaTrophy />} title="Tournaments Played" value={user.tournamentsPlayed} />
          <StatCard icon={<FaWallet />} title="Total Winnings" value={`₹${user.totalWinnings}`} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-[#020617] border border-cyan-500/40 rounded-2xl p-6 flex items-center gap-4
                    shadow-[0_0_20px_rgba(0,255,255,0.08)]
                    hover:shadow-[0_0_30px_rgba(0,255,255,0.25)]
                    hover:-translate-y-1 transition">
      <div className="text-cyan-400 text-xl">{icon}</div>

      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-xl font-semibold text-cyan-300">{value}</p>
      </div>
    </div>
  );
}
