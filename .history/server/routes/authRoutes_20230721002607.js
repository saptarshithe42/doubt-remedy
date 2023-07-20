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
router.post("/api/update_profile_picture", requireSignIn, async (req, res) => {
    try {
        const { imgUrl } = req.body;

        console.log(imgUrl);

        // update imgUrl of the user
        const userID = req.userID;

        await userModel.updateOne({ _id: userID }, { imgUrl: imgUrl });

        res.status(200).json({
            message: "Profile picture updated successfully.",
        });
    } catch (err) {
        res.status(400).json({ error: "Could not update profile picture." });
    }
});

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
