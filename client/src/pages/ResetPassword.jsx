import React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = searchParams.get("email");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return toast.error("both password and confirm password has to be same");
      }
      const reset = await axios.post(
        "https://backendlumio.onrender.com/apis/resetpassword",
        {
          email,
          password,
        }
      );
      toast.success("successfully reset password");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      toast.error("somethings wrong!!!:", error.message);
    }
  };
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <motion.div className="hidden md:flex flex-1 items-center justify-center">
        <img
          className="h-[80%] object-cover rounded-2xl shadow-2xl"
          src="vector.jpg"
          alt="leftSideImage"
        />
      </motion.div>
      <div className="flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-lg px-10 py-12"
        >
          <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
            Reset Password
          </h2>
          <form onSubmit={handleReset}>
            <div className="mb-4 flex flex-col gap-1">
              <label
                className="block text-gray-600 font-semibold mb-2"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter your new Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                className="block text-gray-600 font-semibold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter your new Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 rounded-lg font-semibold shadow-md"
            >
              Update Password
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
