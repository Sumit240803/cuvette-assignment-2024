const twilio = require("twilio");

require('dotenv').config();
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, otp) => {
    await twilioClient.messages.create({
        messagingServiceSid : process.env.TWILIO_MESSAGING_SID,
        body: `Your OTP code is ${otp}.`,
        to: to
    });
};

module.exports = sendSMS;