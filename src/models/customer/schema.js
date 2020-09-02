const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const errorHandler = require('../../utils/errorHandler')

const CustomerSchema = new Schema({
  type: {
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
  verified: {
    type: Boolean,
    default: false
  },
  verify_token: {
    type: String,
    default: null
  },
  login_attempts: {
    type: Number,
    default: 0
  },
  lock_until: {
    type: Number,
    default: null
  },
  locked: {
    type: Boolean,
    default: false
  },
  accepts_marketing: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw errorHandler(422, 'Invalid email address')
      }
    }
  },
  addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CustomerAddress'
    }
  ],
  store_credit: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  }
}, { versionKey: false })

module.exports = CustomerSchema
