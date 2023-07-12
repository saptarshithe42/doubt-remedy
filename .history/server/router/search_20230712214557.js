const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router();
const Authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

require("../db/conn")
const User = require("../models/userSchema");
const Question = require("../models/questionSchema");
const Answer = require("../models/answerSchema");

router.use(cookieParser());



// word search route configured
router.get("/api/search/:word", async (req, res) => {

    try {

        const skip = req.query.skip;
        const limit = req.query.limit;
        const subject = req.query.subject;
        const word = req.params.word;
        let order = req.query.order;

        console.log(word);

        let filter = {
            question: { $regex: `.*${word}*`, $options: 'i' }
        }

        // const data = await Question.find({


        // });


        // newest to oldest : -1, oldest to newest : 1

        if (order === "Newest to Oldest") {
            order = -1;
        }
        else if (order === "Oldest to Newest") {
            order = 1;
        }



        if (subject != "All") {
            filter.subject = subject;
        }

        const data =
            await Question
                .find(filter)
                .sort({ createdAt: order })
                .skip(skip)
                .limit(limit);


        res.status(200).json(data);

    } catch (err) {
        res.status(400).json({ error: "Could not find results" });
    }

})

module.exports = router;