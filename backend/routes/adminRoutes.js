const router = require("express").Router()

const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const LoginHistory = require("../models/LoginHistory");
const authorize = require("../middleware/authorize");

router.get("/dashboard",auth,async(req,res)=>{

if(req.user.role !== "admin")
return res.status(403).send("Access Forbidden")

const users = await User.countDocuments()
const logins = await LoginHistory.countDocuments()

res.json({

users,
logins,
alerts:2

})

});

router.get("/users", auth, async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Forbidden" });
    }

    const users = await User.find().select("-password");
    res.json(users);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get(
  "/users",
  auth,
  authorize("users", "view"),
  async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
  }
);

module.exports = router;