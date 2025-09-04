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
// add save post
router.route("/addsavepost").post(rh.saveThePost);
// get all the saved post of a user
router.route("/getSavedPost/:userId").get(rh.GetAllSavePost);
router.route("/generateotp").post(rh.generateOtp);

export default router;
