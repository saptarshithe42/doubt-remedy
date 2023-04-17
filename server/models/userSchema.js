const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// defining user schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    // tokens: [
    //     {
    //         token: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ]
})


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
}


// collection creation
const User = mongoose.model("USER", userSchema);

module.exports = User;