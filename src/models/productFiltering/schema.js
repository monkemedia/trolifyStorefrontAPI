const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productFilterSchema = new Schema({
  name: {
    type: String
  }
}, { versionKey: false })

module.exports = productFilterSchema
