const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FortuneSchema = new Schema(
  {
    image1: {
      type: String,
      required: true,
    },

    image2: {
      type: String,
      required: true,
    },

    image3: {
      type: String,
      required: true,
    },

    fortune: {
      type: Number,
      required: true,
    },

    fortuneResponse: {
      type: String,
      default: "empty",
    },

    visible: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Fortune = mongoose.model("Fortune", FortuneSchema);

module.exports = Fortune;
