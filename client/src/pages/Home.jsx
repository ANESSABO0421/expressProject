import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { userContext } from "../context/context";
import { FaArrowLeft, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Home = () => {
  const [userData, setUserData] = useState("");
  const [formData, setFormData] = useState([]);

  // for saving state
  const [savedPosts, setSavedPosts] = useState([]);
  // token is send now get it
  const token = localStorage.getItem("token");

  const decoded = jwtDecode(token);
  console.log(decoded.userId);

  const getUser = async () => {
    const users = await axios.get("http://localhost:3000/apis/getusers");
    const user = users.data.find((u) => u._id == decoded.userId);
    setUserData(user);
  };

  const getAllPost = async () => {
    // const allPost = await axios.get("http://localhost:3000/apis/getallpost");
    const allPost = await axios.get("http://localhost:3000/apis/getallpost", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setFormData(allPost.data);
  };

  const userSavePost = async (postId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/apis/addsavepost",
        {
          userId:decoded.userId,
          postId: postId,
        }
      );
      if (savedPosts.includes(postId)) {
        setSavedPosts(savedPosts.filter((id) => id !== postId));
        window.alert("already saved the post");
      } else {
        setSavedPosts([...savedPosts, postId]);
        window.alert("saved the post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getAllPost();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
      <userContext.Provider value={userData}>
        <Navbar />
      </userContext.Provider>
      <div className="grid grid-cols-1 lg:grid-cols-4 items-center justify-center transition-all duration-300 h-auto gap-5 p-5">
        {formData.map((p, indx) => (
          <div
            key={indx}
            className="p-5 flex items-center justify-center mt-[10vh] h-[40vh]"
          >
            <div className="bg-white h-[350px] w-[300px] flex flex-col p-3 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-lg/50">
              <Link to={`/postdetails/${p._id}`} className="w-full h-[200px]">
                <div className="w-full h-full flex items-center justify-center bg-gray-500 rounded-lg overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </Link>

              <div className="flex justify-between items-center w-full mt-3">
                <div>
                  <p className="font-semibold text-gray-800">{p.des}</p>
                  <p className="text-sm text-gray-500">{p.caption}</p>
                </div>
                <div>
                  <button
                    onClick={() => userSavePost(p._id)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700"
                  >
                    {savedPosts.includes(p._id) ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
