import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const login = await axios.post(
        "https://backendlumio.onrender.com/apis/login",
        { email, password }
      );

      toast.success("You have been logged in successfully", {
        className: "!bg-indigo-600 !text-white !rounded-lg !shadow-lg",
        bodyClassName: "!text-white font-semibold",
        progressClassName: "!bg-yellow-400",
      });

      // Save token in localStorage
      localStorage.setItem("token", login.data.token);

      // Redirect
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data, {
          className: "!bg-red-600 !text-white !rounded-lg !shadow-lg",
          bodyClassName: "!text-white font-semibold",
          progressClassName: "!bg-yellow-400",
        });
      } else {
        // Network error or something else
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center  px-4">
      <form
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Join us and explore new opportunities
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition transform active:scale-95 rounded-lg py-3 text-white font-semibold shadow-md"
        >
          Sign Up
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-500 underline-none">
            Signup Now
          </Link>
        </p>
        <p className="text-center mt-4">
          <Link className="text-blue-500 underline-none" to={`/forgotPassword`}>Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
