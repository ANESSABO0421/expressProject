import { Router } from "express";
import * as rh from "./requestHandler.js";
import Auth from "./middleware/Auth.js";

const router = Router();

router.route("/test").get(rh.Sample);
router.route("/newuser").post(rh.newUser);
router.route("/login").post(rh.Login);
router.route("/getusers").get(rh.getUsers);
router.route("/createpost").post(rh.userPost);
router.route("/getallpost").get(Auth,rh.getAllPost);
router.route("/changepassword").post(rh.ChangePassword);

export default router;
