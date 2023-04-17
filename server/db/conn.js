const mongoose = require("mongoose")

const DB = process.env.DATABASE;

// maybe needed in case of deprecation warning
// mongoose.connect(DB, {

//     useNewUrlParser : true,
//     useCreateIndex : true,
//     useUnifiedTopolgy : true,
//     useFindAndModify : false

// }).then(() => {
//     console.log("connection to database successful")
// }).catch((err) => {
//     console.log("Unable to connect to database");
// })


mongoose.connect(DB).then(() => {
    console.log("connection to database successful")
}).catch((err) => {
    console.log("Unable to connect to database");
})