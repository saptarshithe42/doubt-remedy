import questionModel from "../models/questionModel.js";
import userModel from "../models/userModel.js";

export const submitQuestionController = async (req, res) => {
    try {
        // save question in database
        const question = new questionModel(req.body);
        await question.save();

        // add currently asked question's ID in user's askedQuestions array
        const filter = { _id: question.askedByID };
        const updateObject = {
            $push: { askedQuestions: question._id },
            $inc: { points: -question.points },
        };

        await User.updateOne(filter, updateObject);

        res.status(200).json({ message: "Submitted question successfully" });
    } catch (err) {
        res.status(400).json({ error: "Could not submit question" });
    }
};
