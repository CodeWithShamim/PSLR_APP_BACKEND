
// add product controller 
module.exports.addProduct = async (req, res) => {
    try {
        const productData = req.body;

        res.status(200).json({
            success: true,
            message: "Successfully product added",
            user: {}
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};