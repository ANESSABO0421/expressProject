import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { userContext } from "../context/context";
const Home = () => {
  const [userData, setUserData] = useState("");
  const [formData, setFormData] = useState([]);
  // selecting image and carosel
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(selectedPost);

  const userId = localStorage.getItem("userId");

  const getUser = async () => {
    const users = await axios.get("http://localhost:3000/apis/getusers");
    const user = users.data.find((u) => u._id == userId);
    setUserData(user);
  };

  const getAllPost = async () => {
    const allPost = await axios.get("http://localhost:3000/apis/getallpost");
    setFormData(allPost.data);
  };

  useEffect(() => {
    getUser();
    getAllPost();
  }, []);

  const openModel = (post, index = 0) => {
    setSelectedPost(post);
    setCurrentIndex(index);
  };

  // console.log(userData.image);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
      <userContext.Provider value={userData}>
        <Navbar />
      </userContext.Provider>
      <div className="flex flex-col  lg:flex-row  items-center justify-center transition-all duration-300  h-auto gap-5 p-5">
        {formData.map((p, indx) => (
          <div
            key={indx}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  p-5 items-center justify-center h-[40vh] "
          >
            <div
              className="bg-white h-[350px] w-[300px] flex items-center justify-center flex-col p-3 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-lg/50"
              onClick={() => {
                openModel(p, 0);
              }}
            >
              <div className="w-full h-full flex items-center justify-center bg-gray-500 rounded-lg overflow-hidden">
                <img
                  src={p.images[0]}
                  alt=""
                  className=" w-full object-cover rounded-md"
                />
              </div>

              <p className="mt-3 font-semibold text-gray-800">{p.des}</p>
              <p className="text-sm text-gray-500">{p.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/*Model*/}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <motion.div
              className="relative bg-white rounded-xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <motion.img
                key={selectedPost.images[currentIndex]}
                src={selectedPost.images[currentIndex]}
                alt="images"
                className="w-full h-96 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <p className="p-4 text-gray-700">{selectedPost.caption}</p>
              {/* button */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  onClick={() =>
                    setCurrentIndex(
                      (currentIndex - 1 + selectedPost.images.length) %
                        selectedPost.images.length
                    )
                  }
                  className="bg-black/50 text-white p-2 rounded-r-xl"
                >
                  prev
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={() =>
                    setCurrentIndex(
                      (currentIndex + 1) % selectedPost.images.length
                    )
                  }
                  className="bg-black/50 text-white p-2 rounded-l-xl"
                >
                  Next
                </button>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-3 py-1"
              >
                X
              </button>
            </motion.div>
            {/* carosel */}
            <div className="flex  justify-center gap-2 p-4 overflow-x-auto">
              {selectedPost.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="carosel-image"
                  className={`w-16 h-16 object-cover rounded cursor-pointer transition ${
                    idx === currentIndex
                      ? "ring-4 ring-blue-500 scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
