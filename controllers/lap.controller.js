const { addLapService } = require("../services/lap.service");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// add lap controller 
module.exports.addLap = catchAsync(async (req, res, next) => {
    const lapData = req.body;
    const result = await addLapService(lapData);

    if (!result) {
        return next(new AppError("Lap data added error.", 404));
    }

    res.status(201).json({
        success: true,
        message: "successfully lap data added.",
        result,
    });
});