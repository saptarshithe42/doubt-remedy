import express from "express";
import { requireSignIn } from "../middleware/authenticate.js";
import answerModel from "../models/answerModel.js";

// router object
const router = express.Router();

export default router;
