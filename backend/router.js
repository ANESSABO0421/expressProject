import { Router } from "express";
import * as rh from "./requestHandler.js";

const router = Router();

router.route("/test").get(rh.Sample);
router.route("/newuser").post(rh.newUser);
router.route("/login").post(rh.Login);
router.route("/getusers").get(rh.getUsers);
router.route("/createpost").post(rh.userPost);

export default router;
