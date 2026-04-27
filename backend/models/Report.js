const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    title:       { type: String, required: true },
    type:        { type: String, enum: ["revenue", "users", "inventory", "sales", "custom"], required: true },
    status:      { type: String, enum: ["ready", "processing", "failed"], default: "processing" },
    generatedBy: { type: String },
    fileUrl:     { type: String },
    size:        { type: String },
    metrics:     { type: Object },
    dateRange:   {
        from: { type: Date },
        to:   { type: Date },
    },
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
