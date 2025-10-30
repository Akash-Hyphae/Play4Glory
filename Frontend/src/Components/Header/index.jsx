import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { GoDotFill } from "react-icons/go";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tournament", path: "/tournament" },
    { name: "Scrim", path: "/scrim" },
    { name: "TDM", path: "/tdm" },
    { name: "Free", path: "/free" },
    { name: "Live ●", path: "/live" },
    { name: "Login", path: "/login" },
    { name: "SignUp", path: "/signup" },
  ];

  return (
    <header className="bg-[#23272A]">
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
              const isAuthButton =
                item.name === "Login" || item.name === "SignUp";

              return (
                <Link key={item.name} to={item.path} className="relative">
                  {isAuthButton ? (
                    // 🔹 Auth Buttons (Keep background color)
                    <Button
                      disableRipple
                      className={`!capitalize font-semibold px-4 py-2 rounded-lg transition-all duration-300
                        !bg-[#06B6D4] hover:!bg-[#0891B2] !text-white`}
                    >
                      {item.name}
                    </Button>
                  ) : (
                    // 🔸 Normal Nav Buttons (No hover shade, underline on hover)
                    <Button
                      disableRipple
                      sx={{
                        backgroundColor: "transparent !important",
                        "&:hover": {
                          backgroundColor: "transparent !important",
                        },
                      }}
                      className={`!text-white !capitalize font-semibold transition-all duration-300 ease-in-out hover:!text-[#06B6D4]
                        ${
                          isActive
                            ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#06B6D4]"
                            : "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#06B6D4] hover:after:w-full"
                        }`}
                    >
                      {item.name}
                    </Button>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
