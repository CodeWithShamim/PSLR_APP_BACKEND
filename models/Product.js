const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a product title."],
            minLength: [5, "Product title must be at least 5 characters."],
            maxLength: [100, "Product title is too large"],
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
        },
        productUsesDate: {
            type: Number,
            required: [true, "Please added, How many months this product was used?"],
        },
        condition: {
            type: String,
            required: [true, "Please add product condition."],
        },

        location: {
            type: String,
            required: [true, "Location is required."]
        },
        images: [{
            type: String,
            required: [true, "Product images is required."],
            validate: [validator.isURL, "Please provide a valid img url"],
        }],
        status: {
            type: String,
            enum: ["pending", "accept", "reject"],
            default: "pending"
        },
        categories: [{
            name: {
                type: String,
                required: [true, "Category name is required."]
            }
        }],
        reference: {
            type: String,
            required: [true, "User email is required!"],
            select: false,
        },

    }, { timestamps: true, });

productSchema.index({ title: 'text'})
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
