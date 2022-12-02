const Lap = require("../models/Lap")

// add lap 
module.exports.addLapService = async (lapData) => {
    return await Lap.create(lapData)
}