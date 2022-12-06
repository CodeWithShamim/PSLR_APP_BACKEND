const { addEventService } = require("../services/event.service");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// add event controller
module.exports.addEvent = catchAsync(async (req, res, next) => {
    const result = await addEventService(req.body);

    if (!result) {
        return next(new AppError("Can't added this event", 500));
    }

    res.status(201).json({
        success: true,
        message: "Successfully added this event.",
    });
});


// get events controller
module.exports.getEvents = catchAsync(async (req, res, next) => {
    const result = await getEventsService();
    if (!result) {
        return next(new AppError("Can't find any event", 500));
    }

    res.status(201).json({
        success: true,
        message: "Successfully event find.",
    });
});