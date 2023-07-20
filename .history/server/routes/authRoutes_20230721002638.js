import express from "express";
import {
    registerController,
    loginController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middleware/authenticate.js";
import userModel from "../models/userModel.js";

// router object
const router = express.Router();

// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

// update profile picture
router.post(
    "/api/update_profile_picture",
    requireSignIn,
    updateProfilePictureController
);

// router.get("/get_user_data", requireSignIn, (req, res) => {
//     const { username, points } = req.rootUser;

//     const user = {
//         username: username,
//         points: points,
//         userID: req.userID,
//     };

//     res.send(user);
// });

export default router;
