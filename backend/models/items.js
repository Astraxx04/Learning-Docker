const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
  },
  location: {
    type: String,
    required: [true, "Please provide location"],
  },
  category: {
    type: String,
    required: [true, "Please provide category"],
  },
  qrId: {
    type: String,
    required: [true, "Please provide qrId"],
    unique: true,
  },
  userId: {
    type: String,
    // required: [true, "Please provide userId"],
  },
  expiry: {
    type: Date,
    required: [true, "A task must have a date."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["given", "received", "null"],
    default: "null",
  },
});

module.exports = mongoose.model("Items", ItemsSchema);
