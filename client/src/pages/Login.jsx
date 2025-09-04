import React from "react";
import LoginForm from "../components/LoginForm";
import { anticipate, easeOut, motion } from "framer-motion";

const Login = () => {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
      <motion.div
        className="hidden md:flex flex-1 items-center justify-center"
      >
        <img
          className="h-[80%] object-cover rounded-2xl shadow-2xl"
          src="vector.jpg"
          alt="leftSideImage"
        />
      </motion.div>

      {/* Right Side Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1,
          }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
