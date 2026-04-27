const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title:       { type: String, required: true },
    description: { type: String },
    start:       { type: Date, required: true },
    end:         { type: Date, required: true },
    allDay:      { type: Boolean, default: false },
    color:       { type: String, default: "blue" },
    category:    { type: String, enum: ["meeting", "deadline", "reminder", "event", "holiday"], default: "event" },
    attendees:   [{ type: String }],
    location:    { type: String },
    createdBy:   { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
