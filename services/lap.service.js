const Lap = require("../models/Lap")

// add lap 
module.exports.addLapService = async (lapData) => {
    return await Lap.create(lapData)
}

// get all laps 
module.exports.getAllLapsService = async () => {
    return await Lap.find({}, "-_id")
}