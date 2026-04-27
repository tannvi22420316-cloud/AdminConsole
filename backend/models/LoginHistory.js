const mongoose = require("mongoose")

const LoginHistorySchema = new mongoose.Schema({

userId:String,
ip:String,
device:String,
loginTime:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("LoginHistory",LoginHistorySchema)