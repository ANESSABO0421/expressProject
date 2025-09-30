import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = rest of form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
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

  // 1.send otp by giving email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/apis/generateotp", { email });
      toast.success("otp has been send successfully");
      setStep(2);
    } catch (error) {
      toast.error("failed to send otp:", error.message);
    }
  };

  // 2.verifying otp
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const otpVerify = await axios.post(
        "https://backendlumio.onrender.com/apis/verifyotp",
        {
          email,
          userotp: otp,
        }
      );
      if (otpVerify.data.success) {
        toast.success("OTP verified");
        setStep(3);
      } else {
        toast.error("invalid otp");
      }
    } catch (error) {
      toast.error("inavlid Otp");
    }
  };

  // 3.signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      return window.alert("both password and confirm password has to be same");
    }

    const createNewUser = await axios.post(
      "https://backendlumio.onrender.com/apis/newuser",
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
      toast.success("successfully created new user");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } else {
      toast.error("failed to create new user");
    }
  };

  return (
    <div className="flex items-center justify-center  px-4">
      <form
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
        // if on step 1 then handle send otp if step 2 then handle verify otp else signup
        onSubmit={
          step === 1
            ? handleSendOtp
            : step === 2
            ? handleVerifyOtp
            : handleSubmit
        }
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Join us and explore new opportunities
        </p>

        {/* email verifying */}
        {step == 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition transform active:scale-95 rounded-lg py-3 text-white font-semibold shadow-md"
            >
              Send Otp
            </button>
          </>
        )}

        {/* otp verifying */}
        {step === 2 && (
          <>
            <input
              type="Number"
              placeholder="Enter your 4 digit otp"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition transform active:scale-95 rounded-lg py-3 text-white font-semibold shadow-md"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 cursor-not-allowed"
              value={email}
              readOnly
            />
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
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
          </>
        )}

        {/* <input
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
        </button> */}
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
