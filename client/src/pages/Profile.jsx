import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    try {
      const res = await axios.get(`https://backendlumio.onrender.com/apis/myprofile/${id}`);
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [id]);

  function Logout() {
    localStorage.removeItem("token");
    toast.success("You have been logged out", {
      className: "!bg-indigo-600 !text-white !rounded-lg !shadow-lg",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <p className="text-white text-xl font-semibold animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 text-center transform transition duration-500 hover:scale-[1.02]">
        {/* Profile Image */}
        <div className="relative">
          <img
            className="w-32 h-32 mx-auto object-cover border-4 border-indigo-500 shadow-lg"
            src={user.image || "https://via.placeholder.com/150"}
            alt={user.name}
          />

        </div>

        {/* User Info */}
        <h2 className="mt-4 text-3xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 text-sm">
          {user.phoneNumber || "No phone number"}
        </p>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-200"></div>

        {/* Profile Actions */}
        <div className="mt-6 space-y-4">
          <button
            onClick={() => navigate(`/changepassword`)}
            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            Change Password
          </button>

          <button
            onClick={() => navigate(`/editmyprofile/${id}`)}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 font-medium rounded-xl shadow-sm hover:bg-gray-200 hover:shadow-md transform hover:scale-105 transition duration-300"
          >
            Edit Profile
          </button>

          <button
            onClick={Logout}
            className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
