const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    busNumber: { type: String, required: true },
    complaint: { type: String, required: true },
    submittedAt: { type: Date, required: true },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
