import userModel from "../models/userModel.js";

// REGISTER || METHOD POST
export const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Please fill all fields" });
    }

    try {
        const usernameExists = await userModel.findOne({ username: username });

        if (usernameExists) {
            return res.status(400).json({ error: "username already exists." });
        }

        const userExists = await userModel.findOne({ email: email });

        if (userExists) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const user = new userModel({ username, email, password });

        await user.save();

        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            imgUrl: user.imgUrl,
        });
    } catch (error) {
        console.log(error);
    }
};
