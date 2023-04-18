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

router.get("/", (req, res) => {
    res.send("Hello World from router!")
});

// handling promises with async/await
router.post("/api/register", async (req, res) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Please fill all fields" })
    }

    try {
        const usernameExists = await User.findOne({ username: username });

        if (usernameExists) {
            return res.status(400).json({ error: "username already exists." });
        }


        const userExists = await User.findOne({ email: email });


        if (userExists) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const user = new User({ username, email, password });

        // pre-save middleware in between
        await user.save();

        // res.status(201).json({ message: "user registered successfully" });

        res.status(201).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            token: user.generateAuthToken()
        });

    } catch (error) {
        console.log(error);
    }
})



// login route
router.post("/api/signin", async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all fields" })
        }

        const user = await User.findOne({ email: email });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const token = await user.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true
            });

            // token expires after 30 days
            // res.status(200).json({ message: "sign in successful" });

            res.status(200).json({
                _id: user._id,
                email: user.email,
                username: user.username,
                token: token
            });

        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (err) {
        console.log(err);
    }

});


router.get("/api/about", Authenticate, (req, res) => {
    console.log("Hello About page!");
    res.send(req.rootUser);
});


router.get("/api/getdata", Authenticate, (req, res) => {
    // console.log("Hello About page!");
    res.send(req.rootUser);
});


router.get("/api/logout", (req, res) => {

    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("user logged out");
});


// submit question
router.post("/api/submitQuestion", async (req, res) => {

    try {

        // save question in database
        const question = new Question(req.body);
        await question.save();

        // add currently asked question's ID in user's askedQuestions array
        const filter = { _id: question.askedBy }
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


// submit answer
router.post("/api/submitAnswer/", async (req, res) => {

    try {

        // save answer in database
        const answer = new Answer(req.body);
        await answer.save();

        const questionID = answer.questionID;

        // add currently answered question's ID in user's answeredQuestions array
        let filter = { _id: answer.answeredBy };
        let updateObject = {
            $push: { answeredQuestions: questionID },
            $inc: { points: answer.points }
        }

        await User.updateOne(filter, updateObject);

        // add the answer ID in question's answer array
        filter = { _id: questionID };
        updateObject = {
            $push: { answers: answer._id }
        }
        await Question.updateOne(filter, updateObject);

        res.status(200).json({ message: "Submitted answer successfully" });

    } catch (err) {

        res.status(400).json({ error: "Could not submit answer" });

    }
});


// to delete answer with given ID
router.delete("/api/deleteAnswer/:id", async (req, res) => {

    try {

        const answerID = req.params.id;
        const answer = await Answer.findById(answerID);
        const userID = answer.answeredBy;
        const questionID = answer.questionID;

        // decrement points of user and delete the answer ID from user's answeredQuestions array
        let filter = { _id: userID }
        let updateObject = {
            $pull: { answeredQuestions: questionID },
            $inc: { points: -(answer.points) }
        }

        await answer.deleteOne();
        await User.updateOne(filter, updateObject);

        filter = { _id: questionID }
        updateObject = {
            $pull: { answers: answerID }
        }
        await Question.updateOne(filter, updateObject);


        res.status(200).json({ message: "Deleted answer successfully" });

    } catch (err) {

        console.log(err);
        res.status(400).json({ error: "Could not delete answer" });
    }

})


// fetch questions
router.get("/api/questions", async (req, res) => {

    try {

        const skip = req.query.skip;
        const limit = req.query.limit;
        const subject = req.query.subject;
        // newest to oldest : -1, oldest to newest : 1
        const order = req.query.order; 

        const filter = {}

        if (subject) {
            filter.subject = subject;
        }

        const data =
            await Question
                .find(filter)
                .sort({ createdAt: (order ? order : -1) })
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



module.exports = router;