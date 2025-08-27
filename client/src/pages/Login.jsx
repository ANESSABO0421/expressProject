import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
      <div className="hidden md:flex flex-1 items-center justify-center ">
        <img
          className="h-[80%] object-cover rounded-2xl shadow-2xl"
          src="vector.jpg"
          alt="leftSideImage"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div >
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
