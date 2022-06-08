const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    horoscope: {
      type: String,
      required: true,
    },

    gold: {
      type: Number,
      default: 2,
    },

    profileImg: {
      type: String,
      default: null,
    },

    fortunes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fortune",
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
