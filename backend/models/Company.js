const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const  companySchema = new mongoose.Schema({
    name: { type: String, required: true },
  phoneNo: { type: String, required: true,unique: true, },
  companyName: { type: String, required: true,unique: true, },
  companyEmail: { type: String, required: true,unique: true, },
  employeeSize: { type: Number, required: true },
  phoneOtp : {type : String },
  emailOtp : {type : String},
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
})


const Company = mongoose.model('Company', companySchema);

module.exports = Company;