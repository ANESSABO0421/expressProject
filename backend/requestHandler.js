import userPostSchema from "./models/userPostSchema.js";
import userSchema from "./models/userSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Otp from "./models/Otp.js";

dotenv.config();

// nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aneesaboo123@gmail.com",
    pass: "ettt sebp kxfs zuyf",
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

    const otpExist = await Otp.findOne({ email: email });

    if (otpExist) {
      await Otp.updateOne({ email }, { $set: { otp: newOtp } });
    } else {
      await Otp.create({ email, otp: newOtp });
    }

    await transporter.sendMail({
      from: "aneesaboo123@gmail.com",
      to: email,
      subject: "Verification",
      text: `Your OTP is ${newOtp}`,
      html: `<b>Your OTP is ${newOtp}</b>`,
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

    return res.status(200).send({ _id: user._id, token });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
}

// SignUp
export async function newUser(req, res) {
  const { name, email, password, phoneNumber, image } = req.body;
  if (name || email || password || phoneNumber || image) {
    return res.status(400).send("fill all the fields");
  }
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
