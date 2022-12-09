const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const port = process.env.PORT || 3000;
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser');

const colors = require("colors");
const database = require("./utils/database");
const userRoute = require("./routes/v1/user.route");
const productRoute = require("./routes/v1/product.route");
const shippingRoute = require("./routes/v1/shipping.route");
const reportRoute = require("./routes/v1/report.route");
const eventRoute = require("./routes/v1/event.route");
const productLinkRoute = require("./routes/v1/productLink.route");
const lapRoute = require("./routes/v1/lap.route");
const postRoute = require("./routes/v1/post.route");
const commentRoute = require("./routes/v1/comment.route");
const conversationRoute = require("./routes/v1/conversation.route");
const messageRoute = require("./routes/v1/message.route");
const errorHandler = require("./middleware/errorHandler");
const errorController = require("./controllers/error.controller");
const socket = require("./socket");

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
    res.send("Route working...");
})

// route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/shipping", shippingRoute);
app.use("/api/v1/report", reportRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/wishlist", productLinkRoute);
app.use("/api/v1/lap", lapRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/conversation", conversationRoute);
app.use("/api/v1/message", messageRoute);

// connect socket 
socket(io);

// server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
});

app.use(errorController);
process.on("unhandledRejection", (error) => {
    console.log("Global error, ", error.name, error.message);
});