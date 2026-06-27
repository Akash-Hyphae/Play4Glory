import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Wallet } from "lucide-react";

const Header = () => {
  const location = useLocation();

  // Login State
  const isLoggedIn = Boolean(localStorage.getItem("playerToken"));

  // Wallet Balance
  const walletBalance = localStorage.getItem("walletBalance") || "0";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tournament", path: "/tournament" },
    { name: "Scrim", path: "/scrim" },
    { name: "TDM", path: "/tdm" },
    { name: "Live ●", path: "/live" },
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <header className="bg-[#0B1220] border-b border-[#00E5FF] sticky top-0 z-50">
      <div className="header py-2">
        <div className="container flex items-center justify-between">

          {/* Logo */}
          <Link to="/">
            <img
              src="/logofinal.png"
              alt="Play4Glory"
              className="w-36 h-10 pl-10"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4 pr-5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.name} to={item.path} className="relative">
                  <Button
                    disableRipple
                    sx={{
                      backgroundColor: "transparent !important",
                      "&:hover": {
                        backgroundColor: "transparent !important",
                      },
                    }}
                    className={`!text-[#E0F7FA] !capitalize font-semibold hover:!text-[#00E5FF]
                    ${
                      isActive
                        ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-cyan-400"
                        : "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all"
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            })}

            {/* Not Logged In */}
            {!isLoggedIn && (
              <>
                <Link to="/login">
                  <Button
                    className="!bg-cyan-500 hover:!bg-cyan-600 !text-white !capitalize"
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button
                    className="!bg-cyan-500 hover:!bg-cyan-600 !text-white !capitalize"
                  >
                    Signup
                  </Button>
                </Link>
              </>
            )}

            {/* Logged In */}
            {isLoggedIn && (
              <div className="flex items-center gap-4 ml-4">

                {/* Wallet */}
                <div className="flex items-center gap-2 bg-[#1E293B] border border-cyan-500 rounded-lg px-3 py-2">
                  <Wallet size={18} className="text-cyan-400" />
                  <span className="text-white font-semibold">
                    ₹{walletBalance}
                  </span>
                </div>

                {/* Profile */}
                <Link to="/profile">
                  <img
                    src="/avatar.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-cyan-500 hover:scale-105 transition"
                  />
                </Link>

              </div>
            )}
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;