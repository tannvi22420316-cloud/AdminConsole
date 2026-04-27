const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const LoginHistory = require("../models/LoginHistory");

// LOGIN ROUTE
router.post("/login", async (req, res) => {

  try {

    const { username, password, role } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // STRICT ROLE CHECK
    if (user.role !== role) {
      return res.status(403).json({ message: "Access denied for this role" });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      "SECRETKEY",
      { expiresIn: "2h" }
    );

    // Save login history
    await LoginHistory.create({
      userId: user._id,
      ip: req.ip,
      device: req.headers["user-agent"]
    });

    // Send response
    res.json({
      token: token,
      role: user.role
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server Error" });

  }

});


router.post("/send-otp", async (req,res)=>{

  try{

    const {username} = req.body

    const user = await User.findOne({username})

    if(!user)
      return res.status(400).send("User not found")

    // generate 6 digit otp
    const otp = Math.floor(100000 + Math.random()*900000).toString()

    user.otp = otp

    // expiry 30 seconds
    user.otpExpiry = Date.now() + 60*1000

    await user.save()

    // For project testing we log OTP
    console.log("OTP for",username,"is:",otp)

    res.json({
      message:"OTP generated successfully"
    })

  }catch(error){

    console.log(error)
    res.status(500).send("Server error")

  }  

});

router.post("/reset-password", async (req,res)=>{

  try{

    const {username,otp,newPassword} = req.body

    const user = await User.findOne({username})

    if(!user)
      return res.status(400).send("User not found")

    if(user.otp !== otp)
      return res.status(400).send("Invalid OTP")

    if(user.otpExpiry < Date.now())
      return res.status(400).send("OTP expired")

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(newPassword,salt)

    user.password = hashedPassword

    user.otp = null
    user.otpExpiry = null

    await user.save()

    res.send("Password reset successful")

  }catch(error){

    console.log(error)
    res.status(500).send("Server error")

  }

});

module.exports = router;