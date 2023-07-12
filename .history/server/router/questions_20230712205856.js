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


