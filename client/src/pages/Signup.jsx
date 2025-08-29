import React from "react";
import SignupForm from "../components/SignupForm";
import { easeOut, motion } from "framer-motion";

const Signup = () => {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          className="h-[80%] object-cover rounded-2xl shadow-2xl"
          src="vector.jpg"
          alt="leftSideImage"
        />
      </div>

      {/* Right Side Form */}
      <motion.div
        className="flex-1 flex items-center justify-center p-6"
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          ease: easeOut,
        }}
        transition={{
          duration: 0.3,
          delay: 1,
        }}
      >
        <div className="  ">
          <SignupForm />
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
