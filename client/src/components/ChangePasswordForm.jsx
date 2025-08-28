import React, { useState } from "react";
import axios from "axios";

const ChangePasswordForm = () => {
  const [email, setEmail] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hai");
    try {
      const updatePassword = await axios.post(
        "http://localhost:3000/apis/changepassword",
        {
          email,
          oldpassword,
          newpassword,
        }
      );
      if (updatePassword.status == 200) {
        window.alert("password updated successfully");
        window.location.href="/"
      } else {
        return window.alert("failed to updated password");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center  px-4">
      <form
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Change Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          placeholder="current password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          value={oldpassword}
        />
        <input
          type="password"
          placeholder="new password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          value={newpassword}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition transform active:scale-95 rounded-lg py-3 text-white font-semibold shadow-md"
        >
          Update password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
