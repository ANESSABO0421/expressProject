import axios from "axios";
import React from "react";
import { useState } from "react";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState([]);

  const userId = localStorage.getItem("userId");
  //   console.log(userId);

  // createPost
  const createPost = async (e) => {
    try {
      e.preventDefault();
      console.log("haiii");

      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });

      const images = await Promise.all(image.map((file) => toBase64(file)));

      const sendData = await axios.post(
        "http://localhost:3000/apis/createpost",
        {
          userId,
          des: description,
          caption,
          images,
        }
      );

      if (sendData.status == 201) {
        window.alert("posted successfully");
        window.location.href="/home"
      } else if (sendData.status == 400) {
        window.alert("failed to post");
      }
    } catch (error) {
      console.log("Error:" + error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
      <form
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
        onSubmit={createPost}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Post
        </h2>
        <input
          type="text"
          placeholder="description"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="caption"
          placeholder="Enter your caption"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="file"
          multiple
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 file:bg-indigo-200 file:text-indigo-600 file:p-2 file:rounded-xl"
          onChange={(e) => setImage(Array.from(e.target.files))}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition transform active:scale-95 rounded-lg py-3 text-white font-semibold shadow-md"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
