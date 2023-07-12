const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router();
const Authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

require("../db/conn")
const User = require("../models/userSchema");
const Question = require("../models/questionSchema");
const Answer = require("../models/answerSchema");

