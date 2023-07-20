import express from "express";

// router object
const router = express.Router();

// handling promises with async/await
router.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Please fill all fields" });
    }

    try {
        const usernameExists = await User.findOne({ username: username });

        if (usernameExists) {
            return res.status(400).json({ error: "username already exists." });
        }

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const user = new User({ username, email, password });

        // pre-save middleware in between
        await user.save();

        // res.status(201).json({ message: "user registered successfully" });

        const token = await user.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 2589200000),
            httpOnly: true,
        });

        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            imgUrl: user.imgUrl,
            token: user.generateAuthToken(),
        });
    } catch (error) {
        console.log(error);
    }
});

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
