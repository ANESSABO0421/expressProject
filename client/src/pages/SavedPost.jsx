import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SavedPost = () => {
  const [savedPost, setSavedPost] = useState([]);
  const tokenUserId = localStorage.getItem("token");
  const decoded = jwtDecode(tokenUserId);

  const { id } = useParams();
  const getSavedPost = async () => {
    const response = await axios.get(
      `https://backendlumio.onrender.com/apis/getSavedPost/${decoded.userId}`
    );
    setSavedPost(response.data);
  };
  console.log(savedPost);
  useEffect(() => {
    getSavedPost();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 min-h-screen py-8 px-4">
      {savedPost.length > 0 ? (
        <>
          {savedPost.map((post, indx) => (
            <div
              key={indx}
              className="mb-10 max-w-3xl mx-auto bg-white text-black rounded-2xl shadow-2xl p-4"
            >
              <Swiper
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                navigation
                loop={true}
                className="rounded-xl overflow-hidden"
              >
                {post.images?.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      alt="post"
                      className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="mt-4 px-2">
                <p className="text-lg font-semibold text-black drop-shadow">
                  {post.caption}
                </p>
                <p className="text-sm text-gray-700">{post.des}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="h-screen flex items-center justify-center text-2xl text-white rounded">
          No saved posts found
        </p>
      )}
    </div>
  );
};

export default SavedPost;
