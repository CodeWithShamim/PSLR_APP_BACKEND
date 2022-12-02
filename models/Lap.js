const mongoose = require("mongoose");
const validator = require("validator");

const lapSchema = mongoose.Schema({
    sim: {
        type: String,
        required: [true, "Sim info is required."],
    },
    track: {
        type: String,
        required: [true, "Track info is required."]
    },
    setup: {
        type: String,
        required: [true, "Setup info is required."]
    },
    car: {
        type: String,
        required: [true, "Car info is required."]
    },
    link: {
        type: String,
        validate: [validator.isURL, "Please provide a valid link."],
    },
    videoURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid video url."]
    }

})

const Lap = mongoose.model("Lap", lapSchema);

module.exports = Lap;