import express from "express";
import { requireSignIn } from "../middleware/authenticate.js";
import {
    fetchQuestionsController,
    getQuestionByIdController,
    submitQuestionController,
    getAskedQuestionsController,
    getAnsweredQuestionsController,
    searchController,
} from "../controllers/questionController.js";

// router object
const router = express.Router();

// submit question
router.post("/submit-question", requireSignIn, submitQuestionController);

// fetch questions (skip, limit, subject, order queries are supported)
router.get("/fetch-questions", fetchQuestionsController);

// fetch question with given id
router.get("/get-question/:id", getQuestionByIdController);

// get asked questions by user
router.get("/asked_questions", requireSignIn, getAskedQuestionsController);

// get asked questions by user
router.get(
    "/answered_questions",
    requireSignIn,
    getAnsweredQuestionsController
);

// word search route configured
router.get("/search/:word", searchController);

// check if question (id provided) is asked by a particular user
// router.get("/check-asked-question", checkAskedQuestion)

export default router;
