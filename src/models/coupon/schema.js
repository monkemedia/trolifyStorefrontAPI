const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CouponSchema = Schema({
  type: {
    type: String
  },
  name: {
    type: String
  },
  code: {
    type: String,
    unique: true
  },
  coupon_type: {
    type: String
  },
  amount: {
    type: Number
  },
  enabled: {
    type: Boolean
  },
  expiry: {
    type: Date
  },
  number_uses: {
    type: Number
  },
  max_uses: {
    type: Number
  },
  max_uses_per_customer: {
    type: Number
  },
  min_purchase: {
    type: Number
  },
  created_at: {
    type: Date
  }
}, { versionKey: false })

module.exports = CouponSchema
