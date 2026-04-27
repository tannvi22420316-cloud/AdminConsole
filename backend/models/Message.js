const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender:    { type: String, required: true },
    avatar:    { type: String },
    email:     { type: String },
    subject:   { type: String, required: true },
    body:      { type: String, required: true },
    read:      { type: Boolean, default: false },
    starred:   { type: Boolean, default: false },
    tag:       { type: String, enum: ["inbox", "sent", "draft", "spam", "trash"], default: "inbox" },
    priority:  { type: String, enum: ["high", "medium", "low"], default: "medium" },
    date:      { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
