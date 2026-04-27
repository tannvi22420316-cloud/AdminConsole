const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: true, unique: true },
    customer:      { type: String, required: true },
    email:         { type: String },
    avatar:        { type: String },
    type:          { type: String, enum: ["credit", "debit", "refund", "withdrawal"], required: true },
    amount:        { type: Number, required: true },
    currency:      { type: String, default: "USD" },
    status:        { type: String, enum: ["completed", "pending", "failed", "refunded"], default: "pending" },
    method:        { type: String, enum: ["card", "paypal", "bank", "crypto", "wallet"], required: true },
    category:      { type: String },
    description:   { type: String },
    date:          { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
