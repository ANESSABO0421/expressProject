import React from "react";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hai");
    const login = await axios.post("http://localhost:3000/apis/login", {
      email,
      password,
    });
    if (login) {
      window.alert("you have been successfully loggedIn");
      console.log(login.data);

      // Save token in localStorage
      localStorage.setItem("token", login.data.token);

      localStorage.setItem("userId", `${login.data._id}`);
      window.location.href = "/home";
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
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition transform active:scale-95 rounded-lg py-3 text-white font-semibold shadow-md"
        >
          Sign Up
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 underline-none">
            Signup Now
          </a>
        </p>
        <p className="text-center mt-4">
          Want to change your Password?{" "}
          <a href="/changepassword" className="text-blue-500 underline-none">
            Change Password
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
