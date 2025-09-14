import React, { useState, useContext, useRef, useEffect } from "react";
import { userContext } from "../context/context";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Navbar = () => {
  const userData = useContext(userContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const tokenUserId = localStorage.getItem("token");
  const decoded = jwtDecode(tokenUserId);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function Logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    toast.success("You have been logged out", {
      className: "!bg-indigo-600 !text-white !rounded-lg !shadow-lg",
      bodyClassName: "!text-white font-semibold",
      progressClassName: "!bg-yellow-400",
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="h-[70px] bg-white shadow-md flex justify-between items-center px-4 lg:px-8 fixed top-0 w-full z-50">
        {/* Title */}
        <div className="flex items-center">
          <h1
            className="text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent 
                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                 tracking-wide cursor-pointer 
                 animate-gradient hover:scale-105 transition-transform duration-500
                 drop-shadow-lg"
          >
            Lumio
          </h1>

          {/* Tagline */}
          <span className="text-sm lg:text-base text-gray-700 italic lg:ml-4 mt-1 lg:mt-0">
            Light up your social life.
          </span>
        </div>

        {/* Profile & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg focus:outline-none hover:bg-gray-200 transition-colors duration-200"
          >
            <img
              src={userData.image}
              alt="user"
              className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-gray-500 text-sm">Welcome,</span>
              <span className="font-semibold text-gray-800">
                {userData.name}
              </span>
            </div>
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg py-2 z-50
              transform transition-all duration-300 ease-out
              ${
                open
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
          >
            <Link
              to={`/savedpost/${decoded.userId}`}
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-100"
            >
              Saved Post
            </Link>
            <Link
              to={`/myProfile/${decoded.userId}`}
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-100"
            >
              My Profile
            </Link>
            <Link
              to={`/changepassword`}
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-100"
            >
              Change Password
            </Link>
            <Link
              to={`/createpost`}
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-100"
            >
              New Post
            </Link>
            <Link
              to={`/editpost/${decoded.userId}`}
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-100"
            >
              Edit Your Post
            </Link>
            <button
              onClick={Logout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
