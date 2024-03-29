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
        },
        reference: {
            type: String,
            required: [true, "User email is required!"],
            select: false,
        },
        created_at: {
            type: Date,
            default: Date.now(),
            select: false,
          },
    });

const ProductLink = mongoose.model("ProductLink", productLinkSchema);

module.exports = ProductLink;
