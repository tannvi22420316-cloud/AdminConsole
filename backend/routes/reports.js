const express = require("express");
const router  = express.Router();
const Report  = require("../models/Report");
const auth    = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
    try {
        const { type, status } = req.query;
        let query = {};
        if (type   && type   !== "all") query.type   = type;
        if (status && status !== "all") query.status = status;
        const reports = await Report.find(query).sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post("/", auth, async (req, res) => {
    try {
        const report = new Report({ ...req.body, status: "processing" });
        await report.save();
        // Simulate processing delay
        setTimeout(async () => {
            await Report.findByIdAndUpdate(report._id, { status: "ready", size: "2.4 MB" });
        }, 3000);
        res.status(201).json(report);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
