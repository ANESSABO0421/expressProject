import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const EditMyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    image: null, // can be string (URL) or File
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://backendlumio.onrender.com/apis/myprofile/${id}`
        );
        setFormData({
          name: res.data.name || "",
          phoneNumber: res.data.phoneNumber || "",
          image: res.data.image || null, 
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };
    fetchUser();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phoneNumber", formData.phoneNumber);

      if (formData.image && typeof formData.image !== "string") {
        data.append("image", formData.image);
      }

      await axios.put(`https://backendlumio.onrender.com/apis/editprof/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      navigate(`/myprofile/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="absolute top-6 left-6">
        <button
          className="bg-white p-3 rounded-2xl"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Edit Profile
        </h2>

        {/* Name */}
        <div>
          <label className="block text-left text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-left text-gray-600">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-left text-gray-600">Profile Image</label>

          {/* Show existing image if it's a string (URL path) */}
          {formData.image && typeof formData.image === "string" && (
            <div className="mb-4 text-center">
              <img
                src={`http://localhost:3000${formData.image}`}
                alt="Current profile"
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <p className="text-gray-500 text-sm mt-2">
                Current Profile Picture
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditMyProfile;
