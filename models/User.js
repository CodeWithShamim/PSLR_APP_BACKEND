const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Please provide a full name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            validate: [validator.isEmail, "Provide a valid Email"],
            trim: true,
            lowercase: true,
            unique: true,
        },
        country: {
            type: String,
            required: [true, "Country is required"],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },

        // === optional ===
        pin: Number,
        bio: String,
        description: String,
        profilePicture: {
            type: String,
            validate: [validator.isURL, "Please provide a valid url"],
        },

    }, { timestamps: true, });

// create hash password before saving 
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        //  only run if password is modified, otherwise it will change every time we save the user!
        return next();
    }
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    next();
});

// check password vaildation 
userSchema.methods.comparePassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
