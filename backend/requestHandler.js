import userPostSchema from "./models/userPostSchema.js";
import userSchema from "./models/userSchema.js";
import bcrypt from "bcrypt";

export async function Sample() {
  console.log("hail");
}

// Login
export async function Login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userSchema.findOne({ email: email });

    const verifyPass = await bcrypt.compare(password, user.password);
    if (verifyPass) {
      res.status(201).send({ _id: user._id });
    } else {
      res.status(400).send("failed");
    }
  } catch (error) {
    res.status(500).send("server error");
    console.log(error);
  }
}

// SignUp
export async function newUser(req, res) {
  const { name, email, password, phoneNumber, image } = req.body;
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
      res.status(400).send("faled to fetch the posts");
    }
  } catch (error) {
    res.status(500).send("server error");
    console.log(error);
  }
}
