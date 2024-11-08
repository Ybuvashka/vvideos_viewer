const mongoose = require("mongoose");
const { TYPE_VIDEO, GENRE_VIDEO } = require("../utils/constants");

const CoverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(TYPE_VIDEO),
    },
    genre: {
      type: [String],
      enum: Object.values(GENRE_VIDEO),
    },
    description: {
      type: String,
    },
    poster: {
      type: mongoose.Types.ObjectId,
      ref: "File",
    },
    files:[{
      type: mongoose.Types.ObjectId,
      ref:'File'
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cover", CoverSchema);
