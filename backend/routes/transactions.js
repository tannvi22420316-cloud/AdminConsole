const express     = require("express");
const router      = express.Router();
const Transaction = require("../models/Transaction");
const auth        = require("../middleware/authMiddleware");

// GET all
router.get("/", auth, async (req, res) => {
    try {
        const { type, status, method, search } = req.query;
        let query = {};
        if (type   && type   !== "all") query.type   = type;
        if (status && status !== "all") query.status = status;
        if (method && method !== "all") query.method = method;
        if (search) query.$or = [
            { customer:      { $regex: search, $options: "i" } },
            { transactionId: { $regex: search, $options: "i" } },
        ];
        const txns = await Transaction.find(query).sort({ date: -1 });
        res.json(txns);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET stats
router.get("/stats", auth, async (req, res) => {
    try {
        const totalRevenue = await Transaction.aggregate([{ $match: { type: "credit", status: "completed" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
        const totalRefunds = await Transaction.aggregate([{ $match: { type: "refund" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
        const pending      = await Transaction.countDocuments({ status: "pending" });
        const completed    = await Transaction.countDocuments({ status: "completed" });
        res.json({
            revenue:  totalRevenue[0]?.total  || 0,
            refunds:  totalRefunds[0]?.total  || 0,
            pending,
            completed,
        });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST create
router.post("/", auth, async (req, res) => {
    try {
        const txn = new Transaction(req.body);
        await txn.save();
        res.status(201).json(txn);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
