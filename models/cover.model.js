const mongoose = require("mongoose");
const { TYPE_VIDEO, GENRE_VIDEO } = require("../utils/constants");

const CoverSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  type: {
    type: String,
    enum: Object.values(TYPE_VIDEO),
    require: true,
  },
  genre: {
    type: String,
    require: true,
    enum: Object.values(GENRE_VIDEO),
  },
  description: {
    type: String,
    require: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Cover", CoverSchema);
