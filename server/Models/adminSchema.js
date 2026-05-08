const { Schema, model } = require("mongoose");

const loginSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = model("admin", loginSchema);
