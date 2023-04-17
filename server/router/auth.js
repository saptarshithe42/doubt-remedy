const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router();
const Authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

require("../db/conn")
const User = require("../models/userSchema");
const Question = require("../models/questionSchema");

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
        const usernameExists = await User.findOne({username : username});

        if(usernameExists){
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
            _id : user._id,
            email : user.email,
            username : user.username,
            token : user.generateAuthToken()
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
                expires : new Date(Date.now() + 2589200000),
                httpOnly : true
            });

            // token expires after 30 days
            // res.status(200).json({ message: "sign in successful" });

            res.status(200).json({ 
                _id : user._id,
                email : user.email,
                username : user.username,
                token : token
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
  
    res.clearCookie("jwtoken", {path : "/"});
    res.status(200).send("user logged out");
});



router.post("/api/submitQuestion", async (req, res) => {

    try{

        const question = new Question(req.body);
    
        await question.save();

        res.status(200).json({message : "Submitted question successfully"});

    } catch(err){

        res.status(400).json({error : "Could not submit question"});

    }
});


module.exports = router;