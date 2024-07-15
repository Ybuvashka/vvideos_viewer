const { Schema } = require("mongoose");
const { TYPE_VIDEO, GENRE_VIDEO } = require("../utils/constants");

const CoverSchema = new Schema({
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
    enum: Object.value(GENRE_VIDEO),
  },
  description: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

module.exports = model("Cover", CoverSchema);
