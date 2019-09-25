const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({
          error: 'Invalid email address'
        })
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

customerSchema.pre('save', async function (next) {
  // Hash the password before saving the customer model
  const customer = this
  if (customer.isModified('password')) {
      customer.password = await bcrypt.hash(customer.password, 8)
  }
  next()
})

customerSchema.methods.generateAuthToken = async function () {
  // Genrate an auth token for customer
  const customer = this
  const token = jwt.sign({
    _id: customer._id
  }, process.env.JWT_KEY)

  customer.tokens = customer.tokens.concat({ token })
  await customer.save()

  return token
}

customerSchema.statics.findByCredentials = async (email, password) => {
  // Search for a customer by email and password
  const customer = await Customer.findOne({ email })

  if (!customer) {
    throw new Error({
      error: 'Invalid login credentials'
    })
  }

  const isPasswordMatch = await bcrypt.compare(password, customer.password)

  if (!isPasswordMatch) {
    throw new Error({
      error: 'Invalid login credentials'
    })
  }

  return customer
}

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
  