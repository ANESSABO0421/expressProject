import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditYourPost = () => {
  const [usersPost, setUsersPost] = useState([]);
  const navigate=useNavigate()
  const { id } = useParams();

  // Fetch user posts
  const getUserPost = async () => {
    try {
      const userPost = await axios.get(
        `https://backendlumio.onrender.com/apis/getuserpost/${id}`
      );
      setUsersPost(userPost.data);
    } catch (error) {
      toast.error("Failed to fetch posts");
      console.error(error);
    }
  };

  // Delete user post
  async function deletePost(postId) {
    try {
      const res = await axios.delete(
        "https://backendlumio.onrender.com/apis/deleteuserpost",
        {
          data: { deletePostId: postId },
        }
      );
      if (res.status === 200) {
        toast.success("Post deleted successfully");
        setUsersPost(usersPost.filter((post) => post._id !== postId));
      } else {
        toast.error("Failed to delete the post");
      }
    } catch (error) {
      toast.error("Error deleting the post");
      console.error(error);
    }
  }

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 min-h-screen py-10">
      <div className="absolute left-0 ml-5">
        <button
          className="bg-white p-3 rounded-2xl"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>
      </div>
      <h1 className="text-4xl text-center font-bold text-white mb-8">
        Edit Your Posts
      </h1>

      {usersPost.length === 0 ? (
        <div className="flex justify-center items-center mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
            <p className="text-gray-800 text-lg font-medium mb-4">
              You haven’t uploaded anything yet 🚀
            </p>
            <Link
              to="/createpost"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
            >
              Upload Now
            </Link>
          </div>
        </div>
      ) : (
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
                    onClick={() => deletePost(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditYourPost;
