const {ObjectId, Schema, model} = require('mongoose')

const File = new Schema({
  name: { type: String, require: true },
  type: { type: String, require: true },
  path: { type: String },
  date: {
    type: Date,
    default: Date.now(),
  },
  parent: [
    {
      type: ObjectId,
      ref: 'File',
    },
  ],
  childs: [
    {
      type: ObjectId,
      ref: 'File',
    },
  ],
})

module.exports = model('File', File)
