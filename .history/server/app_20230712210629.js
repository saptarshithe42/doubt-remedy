const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");

const app = express();

// provide the path for the config.env file
dotenv.config({path : "./config.env"})
/* 
No need to write dotenv.config({...}) evertime while accessing process.env.something,
mentioning this only once here is enough

*/

require("./db/conn") // for database connection
// const User = require("./models/userSchema");


app.use(express.json())

// linking the router files for routes
app.use(require("./router/auth"));
app.use(require("./router/questions"));
app.use(require("./router/answers"));
app.use(require("./router/search"));


const PORT = process.env.PORT;



// middleware
// const middleware = (req, res, next) => {
//     console.log("middleware running");

//     next();
// }


// app.get("/profile", middleware, (req, res) => {
//     res.send("Hello profile World!")
// })



// app.get("/signin", (req, res) => {
//     res.send("Hello sign in World!")
// })

// app.get("/signup", (req, res) => {
//     res.send("Hello signup World!")
// })


// starting the server
app.listen(PORT, () => {

    console.log(`Server started at port ${PORT}`)

})

