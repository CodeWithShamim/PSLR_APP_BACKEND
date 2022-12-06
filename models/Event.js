const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        image: {
            type: String,
            required: [true, "Please provide a event image."]
        },
        title: {
            type: String,
            required: [true, "Please provide a event title."]
        },
        description: {
            type: String,
            required: [true, "Please provide a event description."]
        },
        location: {
            type: String,
            required: [true, "Please provide a event location."]
        },
    }, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
