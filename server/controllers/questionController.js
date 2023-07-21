import questionModel from "../models/questionModel.js";
import userModel from "../models/userModel.js";

// submit question
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

        await userModel.updateOne(filter, updateObject);

        res.status(200).send({
            success: true,
            message: "Submitted question successfully",
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Could not submit question",
        });
    }
};

// fetch questions
export const fetchQuestionsController = async (req, res) => {
    try {
        const skip = req.query.skip;
        const limit = req.query.limit;
        const subject = req.query.subject;
        // newest to oldest : -1, oldest to newest : 1
        let order = req.query.order;

        if (order === "Newest to Oldest") {
            order = -1;
        } else if (order === "Oldest to Newest") {
            order = 1;
        }

        const filter = {};

        if (subject != "All") {
            filter.subject = subject;
        }

        const questions = await questionModel
            .find(filter)
            .sort({ createdAt: order })
            .skip(skip)
            .limit(limit);

        res.status(200).send({
            success: true,
            questions,
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Could not fetch questions",
            err,
        });
    }
};

// get question by id
export const getQuestionByIdController = async (req, res) => {
    try {
        const questionID = req.params.id;
        const question = await questionModel.findById(questionID);

        if (!question) {
            return res.status(400).send({
                success: false,
                message: "Could not find question.",
            });
        }

        res.status(200).send({
            success: true,
            message: "Question fetched",
            question,
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Could not find question",
        });
    }
};

// get array of question IDs asked by user
export const getAskedQuestionsController = async (req, res) => {
    try {
        const id = req.user._id;

        const questions = await userModel
            .findById(id)
            .select("askedQuestions -_id");

        if (!questions) {
            return res.status(400).send({
                success: false,
                message: "Could not fetch questions.",
            });
        }

        res.status(200).send({
            success: true,
            message: "Questions fetched",
            questions,
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Could not find questions",
        });
    }
};

// get array of question IDs answered by user
export const getAnsweredQuestionsController = async (req, res) => {
    try {
        const id = req.user._id;

        const questions = await userModel
            .findById(id)
            .select("answeredQuestions -_id");

        if (!questions) {
            return res.status(400).send({
                success: false,
                message: "Could not fetch questions.",
            });
        }

        res.status(200).send({
            success: true,
            message: "Questions fetched",
            questions,
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Could not find questions",
        });
    }
};

// search question
export const searchController = async (req, res) => {
    try {
        const skip = req.query.skip;
        const limit = req.query.limit;
        const subject = req.query.subject;
        const word = req.params.word;
        let order = req.query.order;

        let filter = {
            question: { $regex: `.*${word}*`, $options: "i" },
        };

        if (order === "Newest to Oldest") {
            order = -1;
        } else if (order === "Oldest to Newest") {
            order = 1;
        }

        if (subject !== "All") {
            filter.subject = subject;
        }

        const questions = await questionModel
            .find(filter)
            .sort({ createdAt: order })
            .skip(skip)
            .limit(limit);

        res.status(200).send({
            success: true,
            message: "Questions fetched",
            questions,
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Could not find questions",
        });
    }
};
