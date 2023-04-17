const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router();
const Authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

require("../db/conn")
const User = require("../models/userSchema")

router.use(cookieParser());

router.get("/", (req, res) => {
    res.send("Hello World from router!")
});

/*
// handling promises with .then, .catch
router.post("/register", (req, res) => {

    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(422).json({error : "Please fill all fields"})
    }


    User.findOne({email : email})
    .then((userExists) => {
        if(userExists){
            return res.status(422).json({error : "Email already exists."})
        }

        const user = new User({name, email, password});

        user.save().then(() => {
            res.status(201).json({message : "user registered successfully"})
        }).catch((err) => {
            res.status(500).json({error : "failed to register"})
        })
    }).catch((err) => {
        console.log(err);
    })

})
*/


// handling promises with async/await
router.post("/register", async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all fields" })
    }

    try {
        const userExists = await User.findOne({ email: email });


        if (userExists) {
            return res.status(422).json({ error: "Email already exists." });
        }

        const user = new User({ name, email, password });

        // pre-save middleware in between
        await user.save();

        // res.status(201).json({ message: "user registered successfully" });

        res.status(201).json({ 
            _id : user._id,
            email : user.email,
            name : user.name,
            token : user.generateAuthToken()
         });

    } catch (error) {
        console.log(error);
    }
})



// login route
router.post("/signin", async (req, res) => {

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
                name : user.name,
                token : token
             });

        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (err) {
        console.log(err);
    }

});


router.get("/about", Authenticate, (req, res) => {
    console.log("Hello About page!");
    res.send(req.rootUser);
});


router.get("/getdata", Authenticate, (req, res) => {
    // console.log("Hello About page!");
    res.send(req.rootUser);
});


router.get("/logout", (req, res) => {
  
    res.clearCookie("jwtoken", {path : "/"});
    res.status(200).send("user logged out");
});




module.exports = router;