const Report = require("../models/Report");

module.exports.reportProductService = async (reportData) => {
    return await Report.create(reportData);
}

module.exports.getReportsService = async () => {
    return await Report.find({}).populate("productID");
}
