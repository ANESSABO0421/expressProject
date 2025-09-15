import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { jwtDecode } from "jwt-decode";
import { FaArrowLeft } from "react-icons/fa";
import { useContext } from "react";
import { likeContext } from "../context/context";

const PostsDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const formdata = useContext(likeContext);

  // const [user, setUser] = useState("");
  const [userSelectedPost, setUserSelectedPost] = useState(null);
  // posted user image and name
  const [postUser, setPostUser] = useState(null);

  // for back button
  const navigate = useNavigate();

  // getting posted user image and name
  async function fetchPostUser(userId) {
    const getUsers = await axios.get(
      "https://backendlumio.onrender.com/apis/getusers"
    );
    const poster = getUsers.data.find((u) => u._id == userId);
    setPostUser(poster);
  }
  // console.log(formdata)

  // async function getUser() {
  //   const getUsers = await axios.get(
  //     "https://backendlumio.onrender.com/apis/getusers"
  //   );
  //   const getUserWhoPost = getUsers.data.find((u) => u._id == decoded.userId);
  //   setUser(getUserWhoPost);
  // }

  async function fetchUserPost() {
    const allPost = await axios.get(
      "https://backendlumio.onrender.com/apis/getallpost",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const selectedPost = allPost.data.find((post) => post._id === id);
    setUserSelectedPost(selectedPost);

    if (selectedPost) {
      fetchPostUser(selectedPost.userId);
    }
  }

  useEffect(() => {
    fetchUserPost();
    // getUser();
  }, []);

  return (
    <div className="flex min-h-[100vh] justify-center px-2 py-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
      <div className="absolute left-0 ml-5">
        <button
          className="bg-white p-3 rounded-2xl"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>
      </div>
      <div className="h-[700px] mt-20 lg:w-full max-w-md bg-white shadow-md rounded-xl overflow-hidden">
        {userSelectedPost ? (
          <>
            <div className="flex items-center gap-2 p-3 border-b">
              <img
                src={`${postUser?.image}`}
                alt="user avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold text-sm">{postUser?.name}</span>{" "}
            </div>

            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              loop={true}
              modules={[Pagination, Navigation]}
              className="mb-2"
            >
              {userSelectedPost.images?.map((img, indx) => (
                <SwiperSlide key={indx}>
                  <img
                    src={img}
                    alt="post"
                    className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="px-3 pb-3">
              <p className="text-sm font-semibold mb-1">
                {userSelectedPost.caption}
              </p>
              <p className="text-gray-600 text-sm">{userSelectedPost.des}</p>
            </div>
          </>
        ) : (
          <p className="text-center p-4">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PostsDetails;
