const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    name:        { type: String, required: true },
    sku:         { type: String, required: true, unique: true },
    category:    { type: String, required: true },
    stock:       { type: Number, required: true, default: 0 },
    minStock:    { type: Number, default: 10 },
    price:       { type: Number, required: true },
    cost:        { type: Number, required: true },
    supplier:    { type: String },
    image:       { type: String },
    status:      { type: String, enum: ["in-stock", "low-stock", "out-of-stock"], default: "in-stock" },
    location:    { type: String },
    lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

// Auto-set status based on stock
inventorySchema.pre("save", function (next) {
    if (this.stock === 0)               this.status = "out-of-stock";
    else if (this.stock <= this.minStock) this.status = "low-stock";
    else                                this.status = "in-stock";
    next();
});

module.exports = mongoose.model("Inventory", inventorySchema);
