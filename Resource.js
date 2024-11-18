require("dotenv").config();

const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g., book, video, quiz
  content: { type: String, required: true }, // URL or text content
  uploadedBy: { type: String },
});

module.exports = mongoose.model("Resource", resourceSchema);
