const { signupService, findUserByEmail, updatePasswordByEmail, addPinByEmail, removePinByEmail, updateProfileService } = require("../services/user.service");
const { sendMailWithGmail } = require("../utils/emailSender");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");
const validator = require("validator");
const uploader = require("../utils/uploader");
const User = require("../models/User");

// sign up controller 
module.exports.signup = async (req, res) => {
    try {
        const userData = req.body;

        // check email valid 
        if (!validator.isEmail(userData.email)) {
            return res.status(401).json({
                success: false,
                error: "Please provide a valid Email.",
            });
        };

        // check user if exit 
        const isUser = await findUserByEmail(userData.email);
        if (isUser) {
            return res.status(401).json({
                success: false,
                error: "This user already exit.",
            });
        };

        const user = await signupService(userData);
        // remove password form user data 
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            success: true,
            message: "Congratulations!. your account successfully created.",
            user: others
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// login controller 
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(401).json({
                success: false,
                error: "Please provide a valid Email.",
            });
        };

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                error: "Please provide your credentials",
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "No user found. Please create an account",
            });
        }

        const isPasswordValid = user.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({
                success: false,
                error: "Email or password is wrong.",
            });
        }

        // generate token 
        const token = await generateToken({ email: user?.email, role: user?.role || "user" })

        // password retrive form user data 
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            user: others,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// upload image controller 
module.exports.uploadImage = async (req, res) => {
    try {
        //=============== upload image in aws s3 ===============
        const singleUploader = uploader().single("image-upload")
        singleUploader(req, res, (err) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    error: err.message
                })
            }
            res.status(200).json({
                success: true,
                url: req.file?.location
            })
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// update profile controller 
module.exports.updateProfile = async (req, res) => {
    try {
        const updateInfo = req.body;

        // check valid url 
        // if (!validator.isURL(updateInfo.fbURL)) {
        //     return res.status(401).json({
        //         success: false,
        //         error: "Please provide a valid fb url.",
        //     });
        // }

        const result = await updateProfileService(updateInfo);

        if (result.modifiedCount) {
            const user = await findUserByEmail(updateInfo.email);
            // remove password form user data 
            const { password: pwd, ...others } = user.toObject();

            res.status(200).json({
                success: true,
                message: "Successfully update your profile data.",
                user: others,
            });
        } else {
            res.status(401).json({
                success: false,
                error: "Can't update your profile data.",
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// get me controller 
module.exports.getMe = async (req, res) => {
    try {
        const user = await findUserByEmail(req.user?.email);

        // password retrive form user data 
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            success: true,
            user: others,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// get user controller 
module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // password retrive form user data 
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            success: true,
            user: others,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


// forgot password controller
module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        
        if (!validator.isEmail(email)) {
            return res.status(403).json({
                success: false,
                error: "Please provide a valid Email.",
            });
        };

        if (!email) {
            return res.status(403).json({
                success: false,
                error: "Please provide your Email",
            });
        }


        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "No user found. Please create an account",
            });
        }

        // send mail by gmail 
        const pin = Math.floor(1000 + Math.random() * 9000);
        const message = `Your PSLR OTP is ${pin}. OTP will be expired in 2.5 min.`
        const mailData = {
            to: user.email,
            subject: "Your verification code for PSLR.",
            text: message
        };
        const msgId = await sendMailWithGmail(mailData);

        if (!msgId) {
            return res.status(401).json({
                success: false,
                error: "Something went wrong. please try again later.",
            });
        }

        // add pin in db 
        await addPinByEmail({ email: user.email, pin })

        res.status(200).json({
            success: true,
            message: "Successfully verify code send. Check your email address"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


// update password controller
module.exports.updatePassword = async (req, res) => {
    try {
        const { email, newPassword, verifyPin } = req.body;

        if (!email || !newPassword || !verifyPin) {
            return res.status(401).json({
                success: false,
                error: "Data is missing.",
            });
        }
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "user is missing.",
            });
        }

        const isPinMaching = user.pin === verifyPin

        // check pin matching... 
        if (!isPinMaching) {
            return res.status(401).json({
                success: false,
                error: "Your submited pin is wrong. Or, try again later.",
            });
        };

        const hashPassword = bcrypt.hashSync(newPassword);
        const result = await updatePasswordByEmail({ email, hashPassword });
        // remove pin from db 
        await removePinByEmail({ email })

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
