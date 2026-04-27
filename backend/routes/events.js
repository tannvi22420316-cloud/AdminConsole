// ===== routes/events.js =====
const express = require("express");
const router  = express.Router();
const Event   = require("../models/Event");
const auth    = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
    try {
        const events = await Event.find().sort({ start: 1 });
        res.json(events);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post("/", auth, async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(event);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
