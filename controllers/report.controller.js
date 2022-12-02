const { reportProductService, getReportsService } = require("../services/report.service");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// report product controller
module.exports.reportProduct = catchAsync(async (req, res, next) => {
    const reportData = req.body;
    const result = await reportProductService(reportData);

    if (!result) {
        return next(new AppError("Can't find any product", 404));
    }

    res.status(201).json({
        success: true,
        message: "Thanks for reporting.",
    });
});

//get report product controller
module.exports.getReports = catchAsync(async (req, res, next) => {
    const reports = await getReportsService();

    if (!reports) {
        return next(new AppError("Can't find report info", 404));
    }

    res.status(201).json({
        success: true,
        message: "Successfully find reports.",
        reports
    });
});