const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const reportSchema = mongoose.Schema(
    {
        productID: {
            type: ObjectId,
            ref: "Product"
        },
        reason: {
            type: String,
            required: [true, "Report reason is required."],
        },
        status: {
            type: String,
            enum: ["submitted", "resolved"],
            default: "submitted"
        }
    }, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
