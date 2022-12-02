const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const reportSchema = mongoose.Schema(
    {
        productID: {
            type: ObjectId,
            ref: "Product"
        },
        reportType: {
            type: String,
            required: [true, "Report type is required."],
        },
    }, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
