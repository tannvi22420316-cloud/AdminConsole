const router = require("express").Router();
const Role = require("../models/Role");
const auth = require("../middleware/authMiddleware");

// GET ALL ROLES
router.get("/", auth, async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE NEW ROLE
router.post("/", auth, async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE ROLE PERMISSIONS
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Role.findByIdAndUpdate(
      req.params.id,
      { permissions: req.body.permissions },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE ROLE
router.delete("/:id", auth, async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: "Role deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;