const mongoose = require("mongoose");
const validator = require("validator");

const productLinkSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product title is required!"],
        },
        url: {
            type: String,
            required: [true, "Product url is required."],
            validate: [validator.isURL, "Not a valid url!"],
            unique: [true, "This product is already in wishlist!"],
        },

    });

const ProductLink = mongoose.model("ProductLink", productLinkSchema);

module.exports = ProductLink;
