const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String
  }
}, { versionKey: false })

module.exports = categorySchema
