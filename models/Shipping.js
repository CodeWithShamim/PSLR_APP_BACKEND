const mongoose = require("mongoose");
const validator = require("validator");

const shippingSchema = mongoose.Schema(
    {
        boxLength: {
            type: String,
            required: [true, "Please provide a boxLength."],
        },
        boxHeight: {
            type: String,
            required: [true, "Box height is required"],
        },
        boxWidth: {
            type: String,
            required: [true, "Box width is required"],
        },
        boxWeight: {
            type: String,
            required: [true, "Box weight is required"],
        },
        description: {
            type: String,
            required: [true, "Please add shipping description."],
        },
        origin: {
            type: String,
            required: [true, "Origin is required."]
        },
        destination: {
            type: String,
            required: [true, "Destination is required."]
        },
        status: {
            type: String,
            enum: ["pending", "accept", "reject"],
            default: "pending"
        },
        reference: {
            type: String,
            required: [true, "User email is required!"],
        },

    }, { timestamps: true, });

const Shipping = mongoose.model("Shipping", shippingSchema);

module.exports = Shipping;
