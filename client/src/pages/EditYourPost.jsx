import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditYourPost = () => {
  const [usersPost, setUsersPost] = useState([]);
  const { id } = useParams();
  console.log(id);
  const getUserPost = async () => {
    const userPost = await axios.get(
      `https://backendlumio.onrender.com/apis/getuserpost/${id}`
    );
    // console.log(userPost.data)
    setUsersPost(userPost.data);
  };
  console.log(usersPost);

  async function deletePost(id) {
    const deletePost = await axios.delete(
      "https://backendlumio.onrender.com/apis/deleteuserpost",
      {
        data: { deletePostId: id },
      }
    );
    if (deletePost) {
      toast.success("data has been deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.error("failed to delete the post");
    }
  }

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 min-h-screen py-10">
      <h1 className="text-4xl text-center font-bold text-white mb-8">
        Edit Your Posts
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {usersPost.map((post, indx) => (
          <div
            key={indx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={post.images[0]}
              alt={post.caption}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                {post.caption}
              </h2>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {post.des}
              </p>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/editting/${post._id}`}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                  onClick={() => deletePost(`${post._id}`)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditYourPost;
