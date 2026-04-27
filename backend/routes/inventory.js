// ============================================================
// routes/inventory.js
// ============================================================
const express    = require("express");
const router     = express.Router();
const Inventory  = require("../models/Inventory");
const auth       = require("../middleware/authMiddleware"); // your existing auth middleware

// GET all inventory items
router.get("/", auth, async (req, res) => {
    try {
        const { category, status, search } = req.query;
        let query = {};
        if (category && category !== "All") query.category = category;
        if (status   && status   !== "all") query.status   = status;
        if (search)  query.name = { $regex: search, $options: "i" };
        const items = await Inventory.find(query).sort({ updatedAt: -1 });
        res.json(items);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST create item
router.post("/", auth, async (req, res) => {
    try {
        const item = new Inventory(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

// PUT update item
router.put("/:id", auth, async (req, res) => {
    try {
        const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

// DELETE item
router.delete("/:id", auth, async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET stats
router.get("/stats", auth, async (req, res) => {
    try {
        const total     = await Inventory.countDocuments();
        const inStock   = await Inventory.countDocuments({ status: "in-stock" });
        const lowStock  = await Inventory.countDocuments({ status: "low-stock" });
        const outStock  = await Inventory.countDocuments({ status: "out-of-stock" });
        const valueAgg  = await Inventory.aggregate([{ $group: { _id: null, total: { $sum: { $multiply: ["$stock", "$price"] } } } }]);
        res.json({ total, inStock, lowStock, outStock, totalValue: valueAgg[0]?.total || 0 });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;


// ============================================================
// routes/transactions.js  (create this as a separate file)
// ============================================================
// const express      = require("express");
// const router       = express.Router();
// const Transaction  = require("../models/Transaction");
// const auth         = require("../middleware/auth");

// GET all transactions
// router.get("/", auth, async (req, res) => {
//     try {
//         const { type, status, method, search } = req.query;
//         let query = {};
//         if (type   && type   !== "all") query.type   = type;
//         if (status && status !== "all") query.status = status;
//         if (method && method !== "all") query.method = method;
//         if (search) query.$or = [
//             { customer: { $regex: search, $options: "i" } },
//             { transactionId: { $regex: search, $options: "i" } },
//         ];
//         const txns = await Transaction.find(query).sort({ date: -1 });
//         res.json(txns);
//     } catch (err) { res.status(500).json({ message: err.message }); }
// });
