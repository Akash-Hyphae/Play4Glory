import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Wallet, LogOut } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const walletBalance = localStorage.getItem("walletBalance") || 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("walletBalance");
    navigate("/login", { replace: true });
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Create", path: "/create" },
    { name: "Prize Distribution", path: "/prize-distribution" },
    { name: "ID Pass", path: "/id-pass" },
  ];

  return (
    <header className="bg-[#0B1220] border-b border-[#00E5FF] sticky top-0 z-50">
      <div className="header py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/logofinal.png"
                alt="play4glory"
                className="w-36 h-10 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            {token &&
              navItems.map((item) => {
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
                      className={`!text-[#E0F7FA] !capitalize font-semibold transition-all duration-300 ease-in-out hover:!text-[#00E5FF] ${
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

            {!token ? (
              <Link to="/login">
                <Button className="!capitalize font-semibold px-4 py-2 rounded-lg transition-all duration-300 !bg-[#06B6D4] hover:!bg-[#0891B2] !text-black">
                  Login
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2 bg-[#2C2F33] px-3 py-1.5 rounded-lg border border-[#06B6D4]">
                  <Wallet size={18} className="text-[#06B6D4]" />
                  <span className="text-white font-semibold">₹{walletBalance}</span>
                </div>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-gray-400 hover:text-red-400 border border-gray-700 hover:border-red-500 rounded-lg transition cursor-pointer flex items-center justify-center"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;