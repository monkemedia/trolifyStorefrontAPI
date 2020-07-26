const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerWishlistSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
}, { versionKey: false })

module.exports = customerWishlistSchema
