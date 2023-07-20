import mongoose from "mongoose";

// defining question schema
const answerSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },

        answeredByID: {
            type: String,
            required: true,
        },

        answeredByUser: {
            type: String,
            required: true,
        },

        questionID: {
            type: String,
            required: true,
        },

        points: {
            type: Number,
            required: true,
        },

        rating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// collection creation
const Answer = mongoose.model("ANSWER", answerSchema);

module.exports = Answer;
