import userModel from "../models/userModel.js";
import questionModel from "../models/questionModel.js";
import answerModel from "../models/answerModel.js";

// submit answer
export const submitAnswerController = async (req, res) => {
    try {
        // save answer in database
        const answer = await new answerModel(req.body).save();
        await answer.save();

        const questionID = answer.questionID;

        // add currently answered question's ID in user's answeredQuestions array
        let filter = { _id: answer.answeredByID };
        let updateObject = {
            $push: { answeredQuestions: questionID },
            $inc: { points: answer.points },
        };

        await userModel.updateOne(filter, updateObject);

        // add the answer ID in question's answer array
        filter = { _id: questionID };
        updateObject = {
            $push: { answers: answer._id },
        };
        await questionModel.updateOne(filter, updateObject);

        res.status(200).send({
            success: true,
            message: "Submitted answer successfully",
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Could not submit answer",
            error,
        });
    }
};

// to delete answer with given ID
export const deleteAnswerController = async (req, res) => {
    try {
        const answerID = req.params.id;
        const answer = await answerModel.findById(answerID);
        const userID = answer.answeredByID;
        const questionID = answer.questionID;

        // decrement points of user and delete the answer ID from user's answeredQuestions array
        let filter = { _id: userID };
        let updateObject = {
            $pull: { answeredQuestions: questionID },
            $inc: { points: -answer.points },
        };

        await answer.deleteOne();
        await userModel.updateOne(filter, updateObject);

        filter = { _id: questionID };
        updateObject = {
            $pull: { answers: answerID },
        };
        await questionModel.updateOne(filter, updateObject);

        res.status(200).send({
            success: true,
            message: "Deleted answer successfully",
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Could not delete answer",
            error,
        });
    }
};

// fetch answer with given ID
export const getAnswerByIdController = async (req, res) => {
    try {
        const answerID = req.params.id;
        const answer = await answerModel.findById(answerID);

        if (!answer) {
            return res.status(400).send({
                success: false,
                message: "Answer not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Answer Fetched",
            answer,
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "Could not find answer",
            error,
        });
    }
};
