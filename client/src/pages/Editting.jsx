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

  // Fetch the post by ID
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
            images: userPost.images?.length ? userPost.images : [""],
          });
        }
      } catch (error) {
        toast.error("Failed to load post: " + error.message);
      }
    };
    fetchPost();
  }, [id, token]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle multiple image input
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

  // Update API call
  const updatePost = async (e) => {
    e.preventDefault();
    if (!formData.caption.trim() || !formData.des.trim()) {
      toast.error("Caption and Description are required!");
      return;
    }
    try {
      await axios.put(
        `https://backendlumio.onrender.com/apis/edittingpost/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
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

        {/* Images */}
        <div className="space-y-2">
          <label className="font-semibold">Images:</label>
          {formData.images.map((img, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                className="flex-1 p-2 border rounded-lg"
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addImageField}
            className="bg-green-500 text-white px-3 py-1 rounded-lg"
          >
            + Add Image
          </button>
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