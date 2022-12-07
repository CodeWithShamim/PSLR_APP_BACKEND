const mongoose = require("mongoose");
const validator = require("validator");

const lapSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
    },
    sim: {
        type: String,
        required: [true, "Sim info is required."],
    },
    car: {
        type: String,
        required: [true, "Car info is required."]
    },
    trackName: {
        type: String,
        required: [true, "Track name is required."]
    },
    setup: {
        type: String,
        required: [true, "Setup info is required."]
    },

    link: {
        type: String,
        validate: [validator.isURL, "Please provide a valid link."],
    },
    video: {
        type: String,
        validate: [validator.isURL, "Please provide a valid video url."]
    }

})

const Lap = mongoose.model("Lap", lapSchema);

module.exports = Lap;