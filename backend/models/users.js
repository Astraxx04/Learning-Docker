const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Please provide name"]
    },
    username: {
      type: String,
      required: [true, "Please provide username"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    userType: {
      type: String,
      enum: ["admin", "teacher", "staff"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", UsersSchema);
