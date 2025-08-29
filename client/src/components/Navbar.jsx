import React from "react";
import { useContext } from "react";
import { userContext } from "../context/context";

const Navbar = () => {
  const userData = useContext(userContext);
  return (
    <div>
      <nav className="h-[80px] lg:h-[70px] bg-white flex justify-between p-3 lg:p-5">
        {/* title */}
        <div className="flex items-center justify-center">
          <h1 className="text-[14px] lg:text-3xl font-bold">
            Social media App
          </h1>
        </div>
        {/* image */}
        <div className="flex items-center justify-center">
          <img
            src={userData.image}
            alt="user image"
            className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] rounded-full lg:rounded-full object-cover "
          />
          <h1 className="ml-2">Welcome,</h1>
          {userData.name}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
