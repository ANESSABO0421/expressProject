import { Router } from "express";
import * as rh from "./requestHandler.js";
import Auth from "./middleware/Auth.js";

const router = Router();

router.route("/newuser").post(rh.newUser);
router.route("/login").post(rh.Login);
router.route("/getusers").get(rh.getUsers);
router.route("/createpost").post(rh.userPost);
router.route("/getallpost").get(Auth, rh.getAllPost);
router.route("/changepassword").post(rh.ChangePassword);
router.route("/resetpassword").post(rh.resetPassword);
router.route("/sendresetslink").post(rh.sendResetLink);
// add save post
router.route("/addsavepost").post(rh.saveThePost);
// get all the saved post of a user
router.route("/getSavedPost/:userId").get(rh.GetAllSavePost);
router.route("/generateotp").post(rh.generateOtp);
router.route("/verifyotp").post(rh.verifyOtp);
router.route("/getuserpost/:id").get(rh.getUserPost);
router.route("/deleteuserpost").delete(rh.deleteUserPost);
router.route("/edittingpost/:id").put(rh.updatePost);
// like and unlike post
router.route("/like").put(rh.likePost);

export default router;
