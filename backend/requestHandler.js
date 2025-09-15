import userPostSchema from "./models/userPostSchema.js";
import userSchema from "./models/userSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Otp from "./models/Otp.js";
import multer from "multer";
import path from "path";

dotenv.config();

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files go
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

export const upload = multer({ storage });

// nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "extaneesspirit@gmail.com",
    pass: "htsy xfeg oail wqil",
  },
});

export async function generateOtp(req, res) {
  try {
    const { email } = req.body;

    const verifyEmail = await userSchema.findOne({ email: email });
    if (verifyEmail) {
      return res.status(400).send("Email already existed!");
    }
    console.log(verifyEmail);

    const newOtp = Math.floor(1000 + Math.random() * 9000);
    console.log(newOtp);

    const otpExist = await Otp.findOne({ email: email });

    if (otpExist) {
      await Otp.updateOne({ email }, { $set: { otp: newOtp } });
    } else {
      await Otp.create({ email, otp: newOtp });
    }

    await transporter.sendMail({
      from: "extaneesspirit@gmail.com",
      to: email,
      subject: "Your OTP Code for Verification",
      text: `Hello,
      We received a request to verify your account. 
      Your One-Time Password (OTP) is: ${newOtp}
      ⚠️ This code is valid for the next 10 minutes. Please do not share it with anyone.
      If you didn’t request this, you can safely ignore this email.
      Best regards,
      Anees Verification Team`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #fafafa;">
      <h2 style="color: #4F46E5; text-align: center;">🔐 Email Verification</h2>
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 16px; color: #333;">
        We received a request to verify your account. Use the code below to complete your verification:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #4F46E5; background: #E0E7FF; padding: 12px 24px; border-radius: 8px; letter-spacing: 4px;">
          ${newOtp}
        </span>
      </div>
      <p style="font-size: 14px; color: #555; text-align: center;">
        This code will expire in <b>10 minutes</b>. Please do not share it with anyone.
      </p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #888; text-align: center;">
        If you didn’t request this, you can ignore this email.<br>
        © ${new Date().getFullYear()} Anees Verification Team
      </p>
    </div>`,
    });

    return res.status(200).send("OTP sent successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
}

export async function Login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      return res.status(400).send("Invalid credentials");
    }

    // TOKEN GENERATION
    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "24h",
    });

    // only need token
    return res.status(200).send({ _id: user._id, token });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
}

// SignUp
export async function newUser(req, res) {
  const { name, email, password, phoneNumber, image } = req.body;
  // if (name || email || password || phoneNumber || image) {
  //   return res.status(400).send("fill all the fields");
  // }
  try {
    const verifyEmail = await userSchema.findOne({ email: email });
    const hpass = await bcrypt.hash(password, 10);
    if (verifyEmail) {
      return res.status(409).send("email already exitsted");
    }

    const createUser = await userSchema.create({
      name,
      email,
      password: hpass,
      phoneNumber,
      image,
    });
    if (createUser) {
      res.status(201).send(createUser);
    } else {
      res.status(400).send("failed to create the user");
    }
  } catch (error) {
    res.status(500).send("failed create new user");
    console.log(error);
  }
}

// findUser

export async function getUsers(req, res) {
  try {
    const users = await userSchema.find();
    if (users) {
      res.status(201).send(users);
    } else {
      req.status(400).send("failed to fetch");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
}

// change Password
export async function ChangePassword(req, res) {
  const { email, oldpassword, newpassword } = req.body;
  try {
    // verify the emaillll
    const verifyUser = await userSchema.findOne({ email: email });
    if (!verifyUser) {
      return res.status(404).send("User not found!!!");
    }

    // now pasword verifyyyyy
    const verifyPassword = await bcrypt.compare(
      oldpassword,
      verifyUser.password
    );
    if (!verifyPassword) {
      return res.status(400).send("It is not your current password");
    }

    verifyUser.password = await bcrypt.hash(newpassword, 10);
    await verifyUser.save();

    return res.status(200).send("Password updated successfully");
  } catch (error) {
    console.error("ChangePassword error:", error);
    res.status(500).send("Server error");
  }
}

// users post
export async function userPost(req, res) {
  const { userId, des, caption, images } = req.body;

  try {
    // user not present
    const verifyUser = await userSchema.findOne({ _id: userId });
    if (!verifyUser) {
      return res.status(400).send("user not found");
    }

    // post creating
    const postOfUser = await userPostSchema.create({
      userId,
      des,
      caption,
      images,
    });
    if (postOfUser) {
      res.status(201).send("posted successfully");
    } else {
      res.status(400).send("failed to post!!!!");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
}

// get all post
export async function getAllPost(req, res) {
  try {
    const posts = await userPostSchema.find();
    if (posts) {
      res.status(200).send(posts);
    } else {
      res.status(400).send("failed to fetch the posts");
    }
  } catch (error) {
    res.status(500).send("server error");
    console.log(error);
  }
}

// saved post creation
export async function saveThePost(req, res) {
  try {
    const { userId, postId } = req.body;

    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(400).send("user not found!!!");
    }
    // if this match dont add
    const alreadyPostExist = user.savedPosts.includes(postId);
    if (alreadyPostExist) {
      // dont add the post
      // add all the post to savedpost array except the not matchedId
      user.savedPosts = user.savedPosts.filter(
        (id) => id.toString() !== postId
      );
      await user.save();
      return res.status(200).send("saved already!!!");
    } else {
      // add the post
      user.savedPosts.push(postId);
      await user.save();
      return res.status(200).send("Post saved");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
}

// get all user post
export const GetAllSavePost = async (req, res) => {
  try {
    // getting the user based on passed id
    const { userId } = req.params;
    // first check the id and then populate ean it it will add all the details to the saved post array that has a reference from collection posts
    const user = await userSchema.findById(userId).populate("savedPosts");
    // if (!user) {
    //   return res.status(400).send("user is not found!!!");
    // }
    return res.status(200).json(user.savedPosts);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error.message);
  }
};

// otp verification on Sign up
export const verifyOtp = async (req, res) => {
  try {
    const { email, userotp } = req.body;
    // when we click the send otp the email will send to tp schema
    const emailFind = await Otp.findOne({ email: email });
    if (!emailFind) {
      return res.send(400).send("no email has been found");
    }
    // email find now the emails otp and compare the models otp and user entered otp
    if (emailFind.otp !== parseInt(userotp)) {
      return res.send(400).send("invalid otp");
    }

    // delete once verified
    await Otp.deleteOne({ email });
    return res
      .status(200)
      .send({ success: true, message: "otp verified suceessfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// edit user post
export const getUserPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await userSchema.findById(id);
    if (!userFound) {
      return res.status(400).send("user not found");
    }
    const posts = await userPostSchema.find({ userId: id });
    if (!posts) {
      return res.status(400).send("no posts found");
    } else {
      res.status(200).send(posts);
    }
  } catch (error) {
    res.status(500).send("server error:" + error);
  }
};

// delete post
export const deleteUserPost = async (req, res) => {
  try {
    const { deletePostId } = req.body;
    const deleteUser = await userPostSchema.deleteOne({ _id: deletePostId });
    if (deleteUser) {
      res.status(200).send("data has been deleted");
    } else {
      res.status(400).send("failed to delete the post");
    }
  } catch (error) {
    res.status(500).send("server error:" + error.message);
  }
};

// update the editted post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await userPostSchema.findById(id);

    if (!update) {
      return res.status(404).send("Post not found");
    }

    update.caption = req.body.caption || update.caption;
    update.des = req.body.des || update.des;

    // if new images are uploaded
    if (req.files && req.files.length > 0) {
      const filePaths = req.files.map((file) => file.path);
      update.images = filePaths;
    }

    const updatedThePost = await update.save();
    return res.status(200).json(updatedThePost);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server error: " + error.message);
  }
};

// send link for clicking
export const sendResetLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).send("user not found");
    }

    //  This must point to your frontend reset-password page
    const resetUrl = `https://frontend-lumio-tb33.vercel.app
/reset-password?email=${encodeURIComponent(email)}`;

    await transporter.sendMail({
      from: "extaneesspirit@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9; border-radius:8px;">
          <h2 style="color:#4F46E5;">Reset Your Password</h2>
          <p>Hello,</p>
          <p>You requested to reset your password. Click the button below to proceed:</p>
          <a href="${resetUrl}"
             style="display:inline-block; background:#4F46E5; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px; font-weight:bold;">
            Reset Password
          </a>
          <p style="margin-top:20px; font-size:12px; color:#888;">If you didn’t request this, you can ignore this email.</p>
        </div>
      `,
    });
    // await transporter.sendMail({
    //   from: "extaneesspirit@gmail.com",
    //   to: email,
    //   subject: "Password Reset Request",
    //   text: `Click this link to reset your password: http://localhost:3000/reset-password?email=${encodeURIComponent(
    //     email
    //   )}`,
    // });

    res.status(200).send("Reset link sent to your email");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error: " + error.message);
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    // wheatehr user exist
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(404).send("user not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send("password changed successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error:", error.message);
  }
};

// like and unlike post
export const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const post = await userPostSchema.findById(postId);
    if (!post) {
      return res.status(400).send("post not found");
    }
    // unlike
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
      await post.save();
      return res
        .status(200)
        .json({ message: "Unliked successfully", likes: post.likes.length });
    } else {
      post.likes.push(userId);
      await post.save();
      return res
        .status(200)
        .json({ message: "liked successfully", likes: post.likes.length });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error:", error.message);
  }
};

// get profile
export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findById(id).select("-password");
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error:", error.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findById(id);
    if (!user) {
      return res.status(404).send("user not found!!!");
    }
    user.name = req.body.name || user.name;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    if (req.file) {
      user.image = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
      console.log("Uploaded file:", req.file);
    }

    const updateUser = await user.save();
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error:", error.message);
  }
};
