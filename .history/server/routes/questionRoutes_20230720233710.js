import express from "express";
import { requireSignIn } from "../middleware/authenticate.js";
import questionModel from "../models/questionModel.js";
import { submitQuestionController } from "../controllers/questionController.js";

// router object
const router = express.Router();

// SUBMIT QUESTION || METHOD POST
router.post("/submitQuestion", requireSignIn, submitQuestionController);

// FETCH QUESTIONS || METHOD GET
router.get("/fetch-questions", fetchQuestionsContrller);

export default router;
