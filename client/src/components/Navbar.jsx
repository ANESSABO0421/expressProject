import React, { useState } from "react";
import { useContext } from "react";
import { userContext } from "../context/context";
import { FaHamburger, FaWindowClose } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const userData = useContext(userContext);
  const [open, setOpen] = useState(false);
  const tokenUserId = localStorage.getItem("token");

  const decoded=jwtDecode(tokenUserId)

  function Logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    window.location.href = "/";
    window.alert("you have been successfully logged out");
  }

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <nav className="h-[80px] lg:h-[70px] bg-white flex justify-between z-201 p-3 lg:p-5">
        {/* title */}
        <div className="flex items-center justify-center">
          <h1 className="text-[14px] lg:text-3xl font-bold">
            Social media App
          </h1>
        </div>
        {/* image */}
        <div className="flex items-center justify-center gap-2">
          <img
            src={userData.image}
            alt="user image"
            className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] rounded-full lg:rounded-full object-cover "
          />
          <h1 className="ml-2">Welcome,</h1>
          {userData.name}
          {/* sidebar */}
          <button
            onClick={toggle}
            className="bg-pink-500 p-2 rounded text-white z-200"
          >
            {!open ? <AiOutlineMenu /> : <FaWindowClose />}
          </button>

          {/*overlay*/}
          {open && (
            <div
              className="fixed bg-black inset-0 opacity-50 z-100 "
              onClick={toggle}
            ></div>
          )}
        </div>
      </nav>
      {/* sidebar */}
      <div
        className={`fixed right-0 h-full flex flex-col items-center justify-center  bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500  w-64 text-white text-2xl gap-10 z-200 transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link to={`/savedpost/${decoded.userId}`}>Saved post</Link>
        <Link to={`/changepassword`}>Change Password</Link>
        <Link to={`/createpost`}>New Post</Link>
        <Link>Edit Your Post</Link>
        <button
          onClick={() => Logout()}
          className="bg-red-100 text-red-900 p-4 rounded cursor-pointer hover:bg-red-400 hover:-translate-y-1 duration-300 ease-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
