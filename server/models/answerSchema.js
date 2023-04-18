const mongoose = require("mongoose");


// defining question schema
const answerSchema = new mongoose.Schema({

    content : {
        type : String,
        required : true
    },

    answeredBy : {
        type : String,
        required : true
    },

    questionID : {
        type : String,
        required : true
    },

    points : {
        type : Number,
        required : true
    },

    upvote : {
        type : Number,
        default : 0
    },
    downvote : {
        type : Number,
        default : 0
    }
    

}, { timestamps: true });

// collection creation
const Answer = mongoose.model("ANSWER", answerSchema);

module.exports = Answer;