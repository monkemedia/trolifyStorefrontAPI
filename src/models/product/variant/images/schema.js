const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductVariantImageSchema = new Schema({
  type: {
    type: String
  },
  image_id: {
    type: String
  },
  product_id: {
    type: String
  },
  image_url: {
    type: String
  },
  variant_id: {
    type: String
  },
  description: {
    type: String
  }
}, { versionKey: false })

module.exports = ProductVariantImageSchema
