import express from "express";
import { requireSignIn } from "../middleware/authenticate.js";
import {
    fetchQuestionsController,
    getQuestionByIdController,
    submitQuestionController,
} from "../controllers/questionController.js";

// router object
const router = express.Router();

// submit question
router.post("/submitQuestion", requireSignIn, submitQuestionController);

// fetch questions (skip, limit, subject, order queries are supported)
router.get("/fetch-questions", fetchQuestionsController);

// fetch question with given id
router.get("/get-question/:id", getQuestionByIdController);

// get asked questions by user
router.get("/asked_questions", requireSignIn, getAskedQuestionsController);

export default router;
