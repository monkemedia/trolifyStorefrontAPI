const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productImageSchema = new Schema({
  type: {
    type: String
  },
  image_id: {
    type: String
  },
  image_url: {
    type: String
  },
  product_id: {
    type: String
  },
  sort_order: {
    type: Number
  },
  description: {
    type: String
  },
  is_thumbnail: {
    type: Boolean
  }
}, { versionKey: false })

module.exports = productImageSchema
