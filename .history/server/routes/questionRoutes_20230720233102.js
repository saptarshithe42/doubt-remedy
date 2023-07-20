import express from "express";
import { requireSignIn } from "../middleware/authenticate.js";
import questionModel from "../models/questionModel.js";

// router object
const router = express.Router();

// submit question
router.post("/submitQuestion", async (req, res) => {
    try {
        // save question in database
        const question = new Question(req.body);
        await question.save();

        // add currently asked question's ID in user's askedQuestions array
        const filter = { _id: question.askedByID };
        const updateObject = {
            $push: { askedQuestions: question._id },
            $inc: { points: -question.points },
        };

        await User.updateOne(filter, updateObject);

        res.status(200).json({ message: "Submitted question successfully" });
    } catch (err) {
        res.status(400).json({ error: "Could not submit question" });
    }
});

export default router;
