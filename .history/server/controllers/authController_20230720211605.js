import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validations
        if (!name) {
            return res.send({ message: "Name is Required." });
        }

        if (!email) {
            return res.send({ message: "Email is Required." });
        }

        if (!password) {
            return res.send({ message: "Password is Required." });
        }

        // checking user
        const existingUser = await userModel.findOne({ email });

        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered, please login",
            });
        }

        // register user
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            answer,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};

// POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        // check user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered.",
            });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password.",
            });
        }

        // token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        });
    }
};
