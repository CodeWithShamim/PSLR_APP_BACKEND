const { signupService, findUserByEmail } = require("../services/user.service");
const { sendMailWithGmail } = require("../utils/emailSender");

// sign up controller 
module.exports.signup = async (req, res) => {
    try {
        const userData = req.body;
        const user = await signupService(userData);
        // remove password form user data 
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            success: true,
            message: "Successfully signed up",
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
                error: "Password is not correct",
            });
        }

        // remove password form user data 
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            user: others,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    }
};


// reset password controller
module.exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(401).json({
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

        res.status(200).json({
            success: true,
            pin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    }
};
