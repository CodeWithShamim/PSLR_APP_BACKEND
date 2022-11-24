const { signupService } = require("../services/user.service");


module.exports.signup = async (req, res) => {
    try {
        const userData = req.body;
        const user = await signupService(userData);
        res.status(200).json({
            success: true,
            message: "Successfully signed up",
            user: user
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
