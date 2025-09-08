import React, { useState, useContext } from "react";
import { userContext } from "../context/context";
import { FaWindowClose } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Navbar = () => {
  const userData = useContext(userContext);
  const [open, setOpen] = useState(false);
  const tokenUserId = localStorage.getItem("token");

  const decoded = jwtDecode(tokenUserId);

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

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="h-[70px] bg-white shadow-md flex justify-between items-center px-4 lg:px-8 fixed top-0 w-full z-50">
        {/* Title */}
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-extrabold text-indigo-600 tracking-wide">
            Social Media App
          </h1>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3">
          <img
            src={userData.image}
            alt="user"
            className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
          />
          <div className="hidden lg:flex flex-col">
            <span className="text-gray-500 text-sm">Welcome,</span>
            <span className="font-semibold text-gray-800">{userData.name}</span>
          </div>
          <button
            onClick={toggle}
            className="bg-indigo-600 p-2 rounded-full text-white shadow hover:bg-indigo-700 transition duration-300"
          >
            {!open ? <AiOutlineMenu size={22} /> : <FaWindowClose size={22} />}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={toggle}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full flex flex-col items-center justify-center 
        bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 
        w-64 text-white text-xl gap-8 shadow-2xl transform transition-transform duration-500 ease-in-out 
        ${open ? "translate-x-0" : "translate-x-full"} z-50`}
      >
        <Link
          to={`/savedpost/${decoded.userId}`}
          className="hover:text-yellow-300 transition transform hover:scale-105"
        >
          Saved Post
        </Link> 
        <Link
          to={`/changepassword`}
          className="hover:text-yellow-300 transition transform hover:scale-105"
        >
          Change Password
        </Link>
        <Link
          to={`/createpost`}
          className="hover:text-yellow-300 transition transform hover:scale-105"
        >
          New Post
        </Link>
        <Link
          to={`/editpost/${decoded.userId}`}
          className="hover:text-yellow-300 transition transform hover:scale-105"
        >
          Edit Your Post
        </Link>

        <button
          onClick={() => Logout()}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 hover:scale-105 transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
