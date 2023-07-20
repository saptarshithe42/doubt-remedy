const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// defining user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    imgUrl: {
        type: String,
        default:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9-73UZFtwlGMya7r7RPUm8N4na0r_TFLj0JUoh8j9W-2OYo&s",
    },

    points: {
        type: Number,
        min: 0,
        default: 100,
    },

    // contains IDs of questions asked
    askedQuestions: [String],

    // contains IDs of questions answered
    answeredQuestions: [String],
});

// hashing the password
userSchema.pre("save", async function (next) {
    // only when password is changing we are going to do this
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// generating token

userSchema.methods.generateAuthToken = async function () {
    try {
        // jwt.sign(<payload>, <secret_key>)
        // payload must be unique
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        // this.tokens = this.tokens.concat({token : token});
        // await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

// collection creation
export default mongoose.model("USER", userSchema);
