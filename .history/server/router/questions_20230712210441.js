const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const Authenticate = require("../middleware/authenticate");
// const cookieParser = require("cookie-parser");

require("../db/conn")
const User = require("../models/userSchema");
const Question = require("../models/questionSchema");
const Answer = require("../models/answerSchema");


// submit question
router.post("/api/submitQuestion", async (req, res) => {

    try {

        // save question in database
        const question = new Question(req.body);
        await question.save();

        // add currently asked question's ID in user's askedQuestions array
        const filter = { _id: question.askedByID }
        const updateObject = {
            $push: { askedQuestions: question._id },
            $inc: { points: -(question.points) }
        }

        await User.updateOne(filter, updateObject);

        res.status(200).json({ message: "Submitted question successfully" });

    } catch (err) {

        res.status(400).json({ error: "Could not submit question" });

    }
});


// fetch questions
router.get("/api/questions", async (req, res) => {

    try {

        const skip = req.query.skip;
        const limit = req.query.limit;
        const subject = req.query.subject;
        // newest to oldest : -1, oldest to newest : 1
        let order = req.query.order;

        if (order === "Newest to Oldest") {
            order = -1;
        }
        else if (order === "Oldest to Newest") {
            order = 1;
        }

        const filter = {}

        if (subject != "All") {
            filter.subject = subject;
        }

        const data =
            await Question
                .find(filter)
                .sort({ createdAt: order })
                .skip(skip)
                .limit(limit);

        console.log(data);

        res.status(200).json(data);

    } catch (err) {
        res.status(400).json({ error: "Could not fetch questions" });
    }

})



// fetch question with given ID
router.get("/api/question/:id", async (req, res) => {

    try {

        const questionID = req.params.id;
        const question = await Question.findById(questionID);

        // console.log(question);

        if (!question) {
            throw new Error("Question not found");
        }

        res.status(200).json(question);

    } catch (err) {
        res.status(400).json({ error: "Could not find question" });
    }
})