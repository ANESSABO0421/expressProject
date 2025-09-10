import React from "react";
import SignupForm from "../components/SignupForm";
import { easeOut, motion } from "framer-motion";
import { useState } from "react";


const ForgotPassword = () => {
  const [step, setStep] = useState(second)  
  return (
    <div className=" h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
      <motion.div
        className="flex-1 flex-col items-center justify-center p-6"
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
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition transform active:scale-95 rounded-lg py-3 text-white font-semibold shadow-md"
        >
          Send Otp
        </button>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
