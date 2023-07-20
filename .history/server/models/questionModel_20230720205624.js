import mongoose from "mongoose";

// defining question schema
const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },

        askedByID: {
            type: String,
            required: true,
        },

        askedByUser: {
            type: String,
            required: true,
        },

        subject: {
            type: String,
            required: true,
        },

        points: {
            type: Number,
            required: true,
        },

        // answer IDs are stored
        answers: [String],
    },
    { timestamps: true }
);

// collection creation
export default mongoose.model("QUESTION", questionSchema);
