const { signupService, findUserByEmail } = require("../services/user.service");

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
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                error: "Please provide your credentials",
            });
        }

        const user = await findUserByEmail(email);

        console.log(user);

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
