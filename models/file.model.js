const {ObjectId, Schema, model} = require('mongoose')

const FileSchema = new Schema({
  name: { type: String, require: true,trim:true },
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

module.exports = model('File', FileSchema)
