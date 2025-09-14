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
  });
  const [images, setImages] = useState([]); // store selected files

  // Fetch the post by ID (load old data)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `https://backendlumio.onrender.com/apis/getallpost`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const userPost = res.data.find((post) => post._id === id);
        if (userPost) {
          setFormData({
            caption: userPost.caption || "",
            des: userPost.des || "",
          });
          // If backend sends URLs of existing images, keep them
          setImages(userPost.images || []);
        }
      } catch (error) {
        toast.error("Failed to load post: " + error.message);
      }
    };
    fetchPost();
  }, [id, token]);

  // Handle caption & description
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setImages([...e.target.files]); // convert FileList to array
  };

  // Update post
  const updatePost = async (e) => {
    e.preventDefault();
    if (!formData.caption.trim() || !formData.des.trim()) {
      toast.error("Caption and Description are required!");
      return;
    }

    try {
      const data = new FormData();
      data.append("caption", formData.caption);
      data.append("des", formData.des);

      // Append multiple images
      images.forEach((img) => {
        data.append("images", img);
      });

      await axios.put(
        `https://backendlumio.onrender.com/apis/edittingpost/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
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

        {/* Caption */}
        <input
          type="text"
          name="caption"
          value={formData.caption}
          onChange={handleChange}
          placeholder="Caption"
          className="w-full p-3 border rounded-lg"
        />

        {/* Description */}
        <textarea
          name="des"
          value={formData.des}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border rounded-lg"
          rows={4}
        />

        {/* File Upload */}
        <div>
          <label className="font-semibold">Upload Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg mt-2"
          />

          {/* Preview selected images */}
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.isArray(images) &&
              images.map((img, index) => (
                <img
                  key={index}
                  src={
                    img instanceof File
                      ? URL.createObjectURL(img)
                      : img // existing image URL from backend
                  }
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ))}
          </div>
        </div>

        {/* Submit */}
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
