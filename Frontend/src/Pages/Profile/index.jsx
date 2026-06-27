import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import api from "../../Api/axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [wallet, setWallet] = useState({
    walletBalance: 0,
    totalWinnings: 0,
    totalWithdraw: 0,
  });

  const [matches, setMatches] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [profileRes, walletRes, registrationRes] = await Promise.all([
          api.get("/users/profile", config),
          api.get("/users/wallet", config),
          api.get("/users/my-registrations", config),
        ]);

        setProfile(profileRes.data.user);

        setWallet({
          walletBalance: walletRes.data.walletBalance,
          totalWinnings: walletRes.data.totalWinnings,
          totalWithdraw: walletRes.data.totalWithdraw,
        });

        setMatches(registrationRes.data.registrations);
      } catch (error) {
        console.log(error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#020617]">
        <h1 className="text-3xl text-cyan-400 font-bold">Loading Profile...</h1>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#020617]">
        <h1 className="text-cyan-400 text-2xl">Unable to load profile.</h1>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};

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
            <div
              className="flex items-center gap-5 p-6 rounded-2xl border border-cyan-500/30
              bg-[#020617]/60 backdrop-blur-md
              shadow-[0_0_25px_rgba(0,255,255,0.12)]"
            >
              <img
                src={profile.avatar || "/avatar.jpg"}
                alt="profile"
                className="w-20 h-20 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_cyan]"
              />

              <div>
                <h1 className="text-2xl font-semibold tracking-wide">
                  {profile?.displayName}
                </h1>
                <p className="text-gray-400 text-sm">#{profile?.inGameId}</p>
              </div>

              <button
                onClick={handleLogout}
                className="ml-auto px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </div>

            {/* Wallet */}
            <div
              className="p-6 rounded-2xl border border-cyan-500/30
              bg-[#020617]/60 backdrop-blur-md
              shadow-[0_0_25px_rgba(0,255,255,0.1)]"
            >
              <div className="flex items-center gap-3 text-cyan-400 mb-3">
                <FaWallet />
                <span className="text-lg font-medium">Wallet Balance</span>
              </div>

              <p className="text-4xl font-bold text-cyan-300 mb-5">
                ₹{wallet.walletBalance}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/add-money")}
                  className="
        px-5 py-2
        rounded-lg
        border
        border-cyan-400
        text-cyan-300
        hover:bg-cyan-400
        hover:text-black
        transition
    "
                >
                  Add Money
                </button>

                <button
                  onClick={() => navigate("/withdraw")}
                  className="
    px-5 py-2
    rounded-lg
    border
    border-cyan-400
    text-cyan-300
    hover:bg-cyan-400
    hover:text-black
"
                >
                  Withdraw
                </button>
                <button
                  onClick={() => navigate("/wallet-history")}
                  className="px-5 py-2 rounded-lg border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-blacktransition"
                >
                  Wallet History
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              <StatCard title="Tournaments Played" value={matches.length} />
              <StatCard title="Scrims Played" value={0} />
              <StatCard
                title="Total Winnings"
                value={`₹${wallet.totalWinnings}`}
              />
              <StatCard
                title="Total Withdraw"
                value={`₹${wallet.totalWithdraw}`}
              />
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div
            className="p-6 rounded-2xl border border-cyan-500/30
            bg-[#020617]/60 backdrop-blur-md
            shadow-[0_0_25px_rgba(0,255,255,0.1)] h-fit"
          >
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
                  {matches.map((registration, i) => (
                    <tr
                      key={registration._id}
                      className="border-t border-gray-700 hover:bg-cyan-500/5 transition"
                    >
                      <td className="p-3">{registration.tournament?.title}</td>

                      <td className="p-3">
                        <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 text-xs">
                          {registration.tournament?.tournamentType}
                        </span>
                      </td>

                      <td className="p-3 text-gray-400">
                        {new Date(
                          registration.tournament?.startTime,
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-3 text-gray-400">
                        {new Date(
                          registration.tournament?.startTime,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
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
    <div
      className="p-5 rounded-xl border border-cyan-500/30
      bg-[#020617]/60 backdrop-blur-md
      shadow-[0_0_20px_rgba(0,255,255,0.08)]
      hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]
      transition"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-xl font-semibold text-cyan-300 mt-1">{value}</p>
    </div>
  );
}
