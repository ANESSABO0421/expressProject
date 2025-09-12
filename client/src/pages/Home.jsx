import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { userContext } from "../context/context";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Home = () => {
  const [userData, setUserData] = useState("");
  const [formData, setFormData] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]); // state for saved posts

  // get token and decode
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  // fetch user data + savedPosts
  const getUser = async () => {
    try {
      const users = await axios.get(
        "https://backendlumio.onrender.com/apis/getusers"
      );
      const user = users.data.find((u) => u._id === decoded.userId);
      setUserData(user);

      // set savedPosts from DB
      if (user.savedPosts) {
        setSavedPosts(user.savedPosts.map((post) => post._id || post));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // fetch all posts
  const getAllPost = async () => {
    try {
      const allPost = await axios.get(
        "https://backendlumio.onrender.com/apis/getallpost",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFormData(allPost.data);
    } catch (err) {
      console.log(err);
    }
  };

  // save/unsave post
  const userSavePost = async (postId) => {
    try {
      await axios.post("https://backendlumio.onrender.com/apis/addsavepost", {
        userId: decoded.userId,
        postId: postId,
      });

      if (savedPosts.includes(postId)) {
        // remove from saved
        setSavedPosts(savedPosts.filter((id) => id !== postId));
        toast.success("Post unsaved");
      } else {
        // add to saved
        setSavedPosts([...savedPosts, postId]);
        toast.success("Post saved");
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
    <div className="min-h-[900px] w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <userContext.Provider value={userData}>
        <Navbar />
      </userContext.Provider>

      <div className="grid grid-cols-1 lg:grid-cols-4 items-center justify-center transition-all duration-300 h-auto gap-5 p-5 pt-15">
        {formData.map((p, indx) => (
          <div
            key={indx}
            className="p-5 flex items-center justify-center mt-[10vh] h-[40vh]"
          >
            <div className="bg-white h-[350px] w-[300px] flex flex-col p-3 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 overflow-hidden">
              {/* Image */}
              <Link
                to={`/postdetails/${p._id}`}
                className="w-full h-[200px] rounded-xl overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt=""
                    className="w-full h-full object-cover rounded-xl transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>

              {/* Post info */}
              <div className="flex flex-col justify-between items-start w-full mt-3">
                <p className="font-semibold text-gray-800 text-lg line-clamp-2">
                  {p.des}
                </p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                  {p.caption}
                </p>

                <div className="flex justify-end w-full mt-2">
                  <button
                    onClick={() => userSavePost(p._id)}
                    className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
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
