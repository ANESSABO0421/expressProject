import React, { useEffect, useState } from "react";
import axios, { all } from "axios";

const Home = () => {
  const [userData, setUserData] = useState("");
  const [formData, setFormData] = useState([]);

  const userId = localStorage.getItem("userId");

  const getUser = async () => {
    const users = await axios.get("http://localhost:3000/apis/getusers");
    const user = users.data.find((u) => u._id == userId);
    setUserData(user);
  };

  const getAllUser = async () => {
    const allUser = await axios.get("http://localhost:3000/apis/getusers");
    setFormData(allUser.data);
  };

  useEffect(() => {
    getUser();
    getAllUser();
  }, []);

  // console.log(userData.image);
  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
      {/* {userData.name} */}
      <nav className="h-[80px] lg:h-[70px] bg-white flex justify-between p-3 lg:p-5">
        {/* title */}
        <div className="flex items-center justify-center">
          <h1 className="text-[14px] lg:text-3xl font-bold">
            Social media App
          </h1>
        </div>
        {/* image */}
        <div className="flex items-center justify-center">
          <img
            src={userData.image}
            alt="user image"
            className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] rounded-full lg:rounded-full object-cover "
          />
          <h1 className="ml-2">Welcome,</h1>
          {userData.name}
        </div>
      </nav>
      <div className="flex items-center justify-center flex-col gap-5">
        {formData.map((u,indx)=>(
          <div key={indx} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <p>Name:</p>{u.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
