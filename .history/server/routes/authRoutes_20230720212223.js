import express from "express";
import {
    registerController,
    loginController,
} from "../controllers/authController.js";

// router object
const router = express.Router();

// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || METHOD POST
router.post("/login", loginController);

router.get("/api/get_user_data", Authenticate, (req, res) => {
    const { username, points } = req.rootUser;

    const user = {
        username: username,
        points: points,
        userID: req.userID,
    };

    res.send(user);
});

router.get("/api/getdata", Authenticate, (req, res) => {
    // console.log("Hello About page!");
    res.send(req.rootUser);
});

export default router;
