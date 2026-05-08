const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  phone: { type: Number, required: true },
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = model("user", userSchema);
