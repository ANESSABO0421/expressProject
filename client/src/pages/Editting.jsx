import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Editting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    caption: "",
    des: "",
    images: [""],
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(` https://backendlumio.onrender.com/apis/getallpost`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userPost = res.data.find((post) => post._id === id);
        if (userPost) {
          setFormData({
            caption: userPost.caption || "",
            des: userPost.des || "",
            images: userPost.images || [""],
          });
        }
      } catch (error) {
        toast.error("Failed to load post: " + error.message);
      }
    };
    fetchPost();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const updatePost = async (e) => {
    e.preventDefault();
    if (!formData.caption.trim() || !formData.des.trim()) {
      toast.error("Caption and Description are required!");
      return;
    }
    try {
      await axios.put(
        ` https://backendlumio.onrender.com/apis/edittingpost/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Post updated successfully!");
      navigate(`/home`);
    } catch (error) {
      toast.error("Failed to update post: " + error.message);
    }
  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <form
        onSubmit={updatePost}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Edit Post</h1>

        <input
          type="text"
          name="caption"
          value={formData.caption}
          onChange={handleChange}
          placeholder="Caption"
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          name="des"
          value={formData.des}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border rounded-lg"
          rows={4}
        />

       
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg mt-4"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default Editting;
