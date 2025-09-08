import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Editting = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    caption: "",
    des: "",
    images: [""],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await axios.get(
          `http://localhost:3000/apis/getallpost`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userPost = postData.data.find((post) => post._id === id);
        if (userPost) {
          setFormData({
            caption: userPost.caption || "",
            des: userPost.des || "",
            images: userPost.images || [""],
          });
        }
      } catch (error) {
        toast.error("failed to fetch the post:" + error.message);
      }
    };
    fetchData();
  }, [id, token]);
  console.log("fetched data:", formData);

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ">
      <h1>hai</h1>
    </div>
  );
};

export default Editting;
