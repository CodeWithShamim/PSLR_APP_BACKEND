const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3000;
const colors = require("colors");
const database = require("./utils/database");
const userRoute = require("./routes/v1/user.route");
const productRoute = require("./routes/v1/product.route");

// middlewares 
app.use(express.json());
app.use(cors());
database();

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
})

// route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

// server
app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});