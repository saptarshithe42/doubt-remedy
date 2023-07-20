import express from "express";
import { requireSignIn } from "../middleware/authenticate.js";
import questionModel from "../models/questionModel.js";
import { submitQuestionController } from "../controllers/questionController.js";

// router object
const router = express.Router();

// SUBMIT QUESTION || METHOD POST
router.post("/submitQuestion", requireSignIn, submitQuestionController);

// FETCH QUESTIONS || METHOD GET
router.get("/get-questions", async (req, res) => {
    try {
        const skip = req.query.skip;
        const limit = req.query.limit;
        const subject = req.query.subject;
        // newest to oldest : -1, oldest to newest : 1
        let order = req.query.order;

        if (order === "Newest to Oldest") {
            order = -1;
        } else if (order === "Oldest to Newest") {
            order = 1;
        }

        const filter = {};

        if (subject != "All") {
            filter.subject = subject;
        }

        const data = await Question.find(filter)
            .sort({ createdAt: order })
            .skip(skip)
            .limit(limit);

        console.log(data);

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: "Could not fetch questions" });
    }
});

export default router;
