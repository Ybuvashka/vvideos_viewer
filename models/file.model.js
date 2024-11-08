const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    path: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", FileSchema);
