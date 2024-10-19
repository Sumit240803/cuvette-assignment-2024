const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    experienceLevel: { type: String, required: true, enum: ['Junior', 'Mid', 'Senior'] }, // Example experience levels
    candidates: { type: [String], required: true }, // Array of candidate emails
    endDate: { type: Date, required: true }
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
