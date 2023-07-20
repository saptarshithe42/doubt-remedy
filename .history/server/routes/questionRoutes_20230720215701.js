import express from "express";
import {
    registerController,
    loginController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middleware/authenticate.js";

// router object
const router = express.Router();

export default router;
