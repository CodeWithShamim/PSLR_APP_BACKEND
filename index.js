const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const colors = require("colors");
const database = require("./utils/database");
const userRoute = require("./routes/v1/user.route");
const productRoute = require("./routes/v1/product.route");
const productLinkRoute = require("./routes/v1/productLink.route");
const postRoute = require("./routes/v1/post.route");
const commentRoute = require("./routes/v1/comment.route");
const errorHandler = require("./middleware/errorHandler");
const errorController = require("./controllers/error.controller");

// middlewares 
app.use(express.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    })
)
database();

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
})

// route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/wishlist", productLinkRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/comments", commentRoute);

// server
app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});

// globaly error handler 
// app.use(errorHandler);
app.use(errorController);

process.on("unhandledRejection", (error) => {
    console.log("Global error, ", error.name, error.message);
    // app.close(() => {
    //     process.exit(1);
    // });
});