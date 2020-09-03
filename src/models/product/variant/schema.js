const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductVariantSchema = new Schema({
  typP: {
    type: String
  },
  price: {
    type: Object
  },
  sale_price: {
    type: Object
  },
  on_sale: {
    type: Boolean
  },
  stock: {
    type: Number
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'ProductVariantImage'
  }],
  sort_order: {
    type: Number
  },
  sku: {
    type: String
  },
  product_id: {
    type: String
  },
  option_values: [
    {
      _id: false,
      id: {
        type: String
      },
      label: {
        type: String
      },
      option_id: {
        type: String
      },
      option_display_name: {
        type: String
      }
    }
  ]
}, { versionKey: false })

module.exports = ProductVariantSchema
