import express from "express";
import { requireSignIn } from "../middleware/authenticate.js";
import questionModel from "../models/questionModel.js";
import {
    fetchQuestionsController,
    submitQuestionController,
} from "../controllers/questionController.js";

// router object
const router = express.Router();

// submit question
router.post("/submitQuestion", requireSignIn, submitQuestionController);

// fetch questions (skip, limit, subject, order queries are supported)
router.get("/fetch-questions", fetchQuestionsController);

// fetch question with given id
router.get("/get-question/:id", async (req, res) => {
    try {
        const questionID = req.params.id;
        const question = await questionModel.findById(questionID);

        // console.log(question);

        if (!question) {
            throw new Error("Question not found");
        }

        res.status(200).json(question);
    } catch (err) {
        res.status(400).json({ error: "Could not find question" });
    }
});

export default router;
