const { addEventService, getEventsService } = require("../services/event.service");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const pushNotification = require("../utils/pushNotification");

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
    const notification = {
        title:"Pit Lane Sim Racing just posted a new event!",
        body:req.body.title,
        imageUrl:req.body.image,
    }
    pushNotification(notification)
});


// get events controller
module.exports.getEvents = catchAsync(async (req, res, next) => {
    const events = await getEventsService();
    if (!events) {
        return next(new AppError("Can't find any event", 500));
    }

    res.status(201).json({
        success: true,
        message: "Successfully event find.",
        events
    });
});