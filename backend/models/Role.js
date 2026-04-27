const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  permissions: {
    users: {
      view: { type: Boolean, default: false },
      add: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    dashboard: {
      view: { type: Boolean, default: false }
    }
  }
});

module.exports = mongoose.model("Role", RoleSchema);