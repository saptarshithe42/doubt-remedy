import express from "express";
import { requireSignIn } from "../middleware/authenticate.js";
import {
    deleteAnswerController,
    getAnswerByIdController,
    submitAnswerController,
} from "../controllers/answerController.js";

// router object
const router = express.Router();

// submit answer
router.post("/submit-answer", requireSignIn, submitAnswerController);

// to delete answer with given ID
router.delete("/delete-answer/:id", requireSignIn, deleteAnswerController);

// fetch answer with given ID
router.get("/get-answer/:id", getAnswerByIdController);

export default router;
