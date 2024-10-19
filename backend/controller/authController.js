const Company = require("../models/Company");
const sendEmail= require("../utils/sendEmail");
const sendSms = require("../utils/sendSms");
const jwt = require("jsonwebtoken");
const Interview = require("../models/Interview")
exports.signup = async(req,res)=>{
    const {name , phoneNo , companyName , companyEmail , employeeSize} = req.body;

    try{
        let company = await Company.findOne({companyEmail});
        if(company) return res.status(400).json({message : "Company Already Registered"});
        const emailOtp = Math.floor(100000 + Math.random()*900000).toString();
        const phoneOtp = Math.floor(100000 + Math.random()*900000).toString();
        company = new Company({
            name , phoneNo , companyName , companyEmail,employeeSize , phoneOtp , emailOtp
        });
        const replacements = {
            otp : emailOtp
        }
        await sendEmail(companyEmail, 'OTP for verification', 'verificationEmail',replacements);
        await sendSms(phoneNo,phoneOtp);
        await company.save();
        const token = jwt.sign({ email: companyEmail  }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Account created",token : token});
    }catch(error){
        console.log("Some error occurred", error);
    }
}
/*exports.sendOtpToEmail = async(req,res)=>{

    const {email} = req.body;
    const otp = generateOtp();
    req.session.emailOtp = otp;
    const replacements = {
        otp : otp
    }
    try{
        await sendEmail(email, 'OTP for verification', 'verificationEmail',replacements);
        res.status(200).json({ message: 'OTP sent successfully' });
    }catch(error){
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
}
exports.sendOtpToPhone = async(req,res)=>{
    const {phone} = req.body;
    const otp = generateOtp();
    req.session.phoneOtp = otp;
    try{
        await sendSms(phone,otp);
        res.status(200).json({ message: 'OTP sent successfully' });
    }catch(error){
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
}
*/

// Email verification
exports.verifyEmail = async (req, res) => {
    const { companyEmail, emailOtp } = req.body;

    try {
        const company = await Company.findOne({companyEmail});
        // Check if session has the OTP
        if (company.emailOtp !== emailOtp) {
            console.log(companyEmail);
            console.log(emailOtp);
            return res.status(400).json({ message: "Invalid email OTP" });
        }

        // Find the company and update isEmailVerified
        const Upcompany = await Company.findOneAndUpdate(
            { companyEmail },
            { $set: { isEmailVerified: true } },
            { new: true }
        );

        if (!Upcompany) {
            return res.status(404).json({ message: "Company not found" });
        }

        // Email verification successful
        return res.status(200).json({ message: "Email verified successfully", company });
    } catch (error) {
        console.error("Error verifying email", error);
        return res.status(500).json({ message: "An error occurred during email verification" });
    }
};

// Phone verification
exports.verifyPhone = async (req, res) => {
    const { phoneNo, phoneOtp } = req.body;

    try {
        const company = await Company.findOne({phoneNo});
        // Check if session has the OTP
        if (company.phoneOtp !== phoneOtp) {
            console.log(req.session.phoneOTP)
            return res.status(400).json({ message: "Invalid phone OTP" });
        }

        // Find the company and update isPhoneVerified
        const Upcompany = await Company.findOneAndUpdate(
            { phoneNo },
            { $set: { isPhoneVerified: true } },
            { new: true }
        );

        if (!Upcompany) {
            return res.status(404).json({ message: "Company not found" });
        }

        // Phone verification successful
        return res.status(200).json({ message: "Phone verified successfully", company });
    } catch (error) {
        console.error("Error verifying phone", error);
        return res.status(500).json({ message: "An error occurred during phone verification" });
    }
};

exports.addInterview = async(req,res)=>{
    const {jobTitle ,jobDescription,experienceLevel,candidates,endDate} = req.body;
    try{
        const newInterview = new Interview({
            jobTitle,
            jobDescription,
            experienceLevel,
            candidates,
            endDate
        })
        await newInterview.save();
        const replacements = {
            jobTitle : jobTitle,
            jobDescription : jobDescription,
            experienceLevel : experienceLevel,
            endDate : endDate
        }
        for(const candidate of candidates){
            await sendEmail(candidate,"Interview Call", "Interview", replacements);
        }
        return res.status(200).json({ message: "Interview Created" });
    }catch(error){
        console.error("Error verifying phone", error);
        return res.status(500).json({ message: "An error occurred during Interview Creation." });
    }
}