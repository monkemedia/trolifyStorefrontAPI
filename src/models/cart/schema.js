const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  line_items: [
    {
      quantity: {
        type: Number,
        required: true
      },
      product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      variant_id: {
        type: Schema.Types.ObjectId,
        ref: 'ProductVariant'
      }
    }
  ],
  customer_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  currency_code: {
    type: String,
    default: 'GBP'
  },
  is_tax_included: {
    type: Boolean,
    default: false
  },
  discount_amount: {
    type: Number,
    default: 0
  },
  base_amount: {
    type: Number,
    default: 0
  },
  cart_amount: {
    type: Number,
    default: 0
  },
  coupons: [{
    id: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    },
    amount: {
      type: Number,
      default: 0
    },
    coupon_type: {
      type: String,
      default: ''
    }
  }],
  date_created: {
    type: Date,
    default: Date.now
  },
  date_updated: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

module.exports = cartSchema
