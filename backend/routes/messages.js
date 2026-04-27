// ===== routes/messages.js =====
const express  = require("express");
const router   = express.Router();
const Message  = require("../models/Message");
const auth     = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
    try {
        const { tag, read, search } = req.query;
        let query = {};
        if (tag  && tag  !== "all") query.tag  = tag;
        if (read !== undefined)     query.read = read === "true";
        if (search) query.$or = [
            { sender:  { $regex: search, $options: "i" } },
            { subject: { $regex: search, $options: "i" } },
        ];
        const messages = await Message.find(query).sort({ date: -1 });
        res.json(messages);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post("/", auth, async (req, res) => {
    try {
        const msg = new Message(req.body);
        await msg.save();
        res.status(201).json(msg);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const msg = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(msg);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;


// ===== Save this as routes/events.js =====
// const express = require("express");
// const router  = express.Router();
// const Event   = require("../models/Event");
// const auth    = require("../middleware/auth");
//
// router.get("/", auth, async (req, res) => {
//     try {
//         const events = await Event.find().sort({ start: 1 });
//         res.json(events);
//     } catch (err) { res.status(500).json({ message: err.message }); }
// });
//
// router.post("/", auth, async (req, res) => {
//     try {
//         const event = new Event(req.body);
//         await event.save();
//         res.status(201).json(event);
//     } catch (err) { res.status(400).json({ message: err.message }); }
// });
//
// router.put("/:id", auth, async (req, res) => {
//     try {
//         const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(event);
//     } catch (err) { res.status(400).json({ message: err.message }); }
// });
//
// router.delete("/:id", auth, async (req, res) => {
//     try {
//         await Event.findByIdAndDelete(req.params.id);
//         res.json({ message: "Deleted" });
//     } catch (err) { res.status(500).json({ message: err.message }); }
// });
//
// module.exports = router;
