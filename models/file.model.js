const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  type: { type: String, require: true },
  path: { type: String },
  date: {
    type: Date,
    default: Date.now(),
  },
  parent: [
    {
      type: ObjectId,
      ref: "File",
    },
  ],
  childs: [
    {
      type: ObjectId,
      ref: "File",
    },
  ],
  cover: {
    type: mongoose.Types.ObjectId,
    ref: "Cover",
  },
});

module.exports = mongoose.model("File", FileSchema);
