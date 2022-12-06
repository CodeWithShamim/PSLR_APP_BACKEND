const Event = require("../models/Event");

module.exports.addEventService = async (eventInfo) => {
    return await Event.create(eventInfo);
}

module.exports.getEventsService = async () => {
    return await Event.find({});
}