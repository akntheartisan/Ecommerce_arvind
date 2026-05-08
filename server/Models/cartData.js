const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    cartDetails: {
      type: Array,
    },
  },
  { timestamps: true },
);

module.exports = model("cart", cartSchema);
