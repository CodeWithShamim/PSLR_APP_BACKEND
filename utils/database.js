const mongoose = require("mongoose");

// database connection
module.exports = () => {
    mongoose.connect(process.env.DB_LOCAl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("DB connect success......".red.bold))
        .catch((error) => console.log("Error", error.message))
}