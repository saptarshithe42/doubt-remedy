import express from "express";
import { requireSignIn } from "../middleware/authenticate.js";
import questionModel from "../models/questionModel.js";

// router object
const router = express.Router();

// submit question
router.post("/submitQuestion", requireSignIn, submitQuestionController);

export default router;
