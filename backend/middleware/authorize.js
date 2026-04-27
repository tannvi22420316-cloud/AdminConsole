const Role = require("../models/Role");

const authorize = (module, action) => {
  return async (req, res, next) => {
    try {
      const role = await Role.findOne({ name: req.user.role });

      if (!role || !role.permissions[module][action]) {
        return res.status(403).json({ message: "Access Denied" });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

module.exports = authorize;