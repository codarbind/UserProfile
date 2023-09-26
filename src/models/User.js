const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: String,
    last_name: String,
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
    isDeleted: { type: Boolean, default: false },

    email: {
      type: String,
      required: true, // Make email required
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
