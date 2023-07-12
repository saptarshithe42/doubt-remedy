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


        const token = await user.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 2589200000),
            httpOnly: true
        });

        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            imgUrl : user.imgUrl,
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
                imgUrl : user.imgUrl,
                token: token
            });

        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (err) {
        console.log(err);
    }

});


router.get("/api/get_user_data", Authenticate, (req, res) => {

    const { username, points } = req.rootUser;

    const user = {
        username: username,
        points: points,
        userID: req.userID
    }

    res.send(user);
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
// router.post("/api/submitQuestion", async (req, res) => {

//     try {

//         // save question in database
//         const question = new Question(req.body);
//         await question.save();

//         // add currently asked question's ID in user's askedQuestions array
//         const filter = { _id: question.askedByID }
//         const updateObject = {
//             $push: { askedQuestions: question._id },
//             $inc: { points: -(question.points) }
//         }

//         await User.updateOne(filter, updateObject);

//         res.status(200).json({ message: "Submitted question successfully" });

//     } catch (err) {

//         res.status(400).json({ error: "Could not submit question" });

//     }
// });


// submit answer
router.post("/api/submitAnswer/", async (req, res) => {

    try {

        // save answer in database
        const answer = new Answer(req.body);
        await answer.save();

        const questionID = answer.questionID;

        // add currently answered question's ID in user's answeredQuestions array
        let filter = { _id: answer.answeredByID };
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
        const userID = answer.answeredByID;
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

// fetch answer with given ID
router.get("/api/answer/:id", async (req, res) => {

    try {

        const answerID = req.params.id;
        const answer = await Answer.findById(answerID);

        // console.log(question);

        if (!answer) {
            throw new Error("Answer not found");
        }

        res.status(200).json(answer);

    } catch (err) {
        res.status(400).json({ error: "Could not find answer" });
    }
})


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


// get asked questions by user
router.get("/api/asked_questions", Authenticate, async (req, res) => {

    res.status(200).json(req.rootUser.askedQuestions);

})

// get asked questions by user
router.get("/api/answered_questions", Authenticate, async (req, res) => {

    res.status(200).json(req.rootUser.answeredQuestions);

})


router.post("/api/update_profile_picture", Authenticate, async (req, res) => {

    try{

        const {imgUrl} = req.body;

        console.log(imgUrl);

        // res.status(200).json({url : imgUrl});

        // update imgUrl of the user
        const userID = req.userID;

        await User.updateOne({_id : userID}, {imgUrl : imgUrl});

        res.status(200).json({message : "Profile picture updated successfully."});



    } catch(err){
        res.status(400).json({ error: "Could not update profile picture." });
    }

})


module.exports = router;