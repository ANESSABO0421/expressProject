import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [image, setImage] = useState("");

  const handelFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      return window.alert("both password and confirm password has to be same");
    }
    // console.log("hai");
    // console.log(name, email, password, phoneNumber);

    const createNewUser = await axios.post(
      "http://localhost:3000/apis/newuser",
      {
        name,
        email,
        password,
        phoneNumber,
        image,
      }
    );

    // confirming password

    if (createNewUser) {
      window.alert("successfully added new user");
      window.location.href = "/";
    } else {
      window.alert("failed to create new user");
    }
  };

  return (
    <div className="flex items-center justify-center  px-4">
      <form
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Join us and explore new opportunities
        </p>

        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <input
          type="Number"
          placeholder="Enter your phone number"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
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
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass}
          required
        />
        <input
          type="file"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500  file:bg-indigo-200 file:text-indigo-800 file:p-2 file:rounded"
          onChange={handelFileChange}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition transform active:scale-95 rounded-lg py-3 text-white font-semibold shadow-md"
        >
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to={"/"} className="text-blue-500 underline">
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
