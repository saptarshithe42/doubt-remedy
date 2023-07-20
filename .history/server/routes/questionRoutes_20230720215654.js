import express from "express";
import {
    registerController,
    loginController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middleware/authenticate.js";

// router object
const router = express.Router();

// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || METHOD POST
router.post("/login", loginController);

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
