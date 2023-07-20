import express from "express";
import { registerController } from "../controllers/authController.js";

// router object
const router = express.Router();

// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || METHOD POST
router.post("/login", loginController);

// login route
router.post("/api/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all fields" });
        }

        const user = await User.findOne({ email: email });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const token = await user.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true,
            });

            // token expires after 30 days
            // res.status(200).json({ message: "sign in successful" });

            res.status(200).json({
                _id: user._id,
                email: user.email,
                username: user.username,
                imgUrl: user.imgUrl,
                token: token,
            });
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
    }
});

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
