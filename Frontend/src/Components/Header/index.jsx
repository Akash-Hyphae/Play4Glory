import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Wallet } from "lucide-react";

const Header = () => {
  const location = useLocation();

  // 🔹 Example auth state (replace with real auth later)
  const isLoggedIn = !!localStorage.getItem("playerToken");
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
        <div className="container flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/logofinal.png"
                alt="play4glory"
                className="w-36 h-10 pl-10"
              />
            </Link>
          </div>

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
                    className={`!text-[#E0F7FA] !capitalize font-semibold transition-all duration-300 ease-in-out hover:!text-[#00E5FF]
                      ${
                        isActive
                          ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#06B6D4]"
                          : "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#06B6D4] hover:after:w-full"
                      }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            })}

            {/* 🔹 If NOT logged in → show Login & Signup */}
            {!isLoggedIn && (
              <>
                <Link to="/login">
                  <Button className="!capitalize font-semibold px-4 py-2 rounded-lg transition-all duration-300 !bg-[#06B6D4] hover:!bg-[#0891B2] !text-white">
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button className="!capitalize font-semibold px-4 py-2 rounded-lg transition-all duration-300 !bg-[#06B6D4] hover:!bg-[#0891B2] !text-white">
                    SignUp
                  </Button>
                </Link>
              </>
            )}

            {/* 🔹 If logged in → show Wallet + Circular Profile */}
            {isLoggedIn && (
              <div className="flex items-center gap-4 ml-4">
                {/* Wallet */}
                <div className="flex items-center gap-2 bg-[#2C2F33] px-3 py-1 rounded-lg border border-[#06B6D4]">
                  <Wallet size={18} className="text-[#06B6D4]" />
                  <span className="text-white font-semibold">
                    ₹{walletBalance}
                  </span>
                </div>

                {/* Circular Profile Image */}
                <Link to="/profile">
                  <img
                    src="avatar.jpg"
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-cyan-500 hover:scale-105 transition-transform cursor-pointer"
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
