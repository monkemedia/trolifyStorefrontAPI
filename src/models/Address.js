const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
  customer_id: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: false
  },
  line_1: {
    type: String,
    required: true
  },
  line_2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  county: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: false
  },
  instructions: {
    type: String,
    required: false
  },
  default: {
    type: Boolean,
    required: false,
    default: false
  }
})

addressSchema.pre('save', async function (next) {
  next()
})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address
