const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const customerSchema = require('./schema.js')

// Hash the password before saving the customer model
customerSchema.pre('save', async function (next) {
  const customer = this

  if (customer.isModified('password')) {
    customer.password = await bcrypt.hash(customer.password, 8)
  }
  next()
})

// Generate customer verify token
customerSchema.methods.generateVerifyToken = async function (expiresIn) {
  const customer = this
  const verifyToken = jwt.sign({
    email: customer.email
  }, process.env.CLIENT_SECRET, { expiresIn: expiresIn || '24hrs' })

  return verifyToken
}

// Generate an token for customer
customerSchema.methods.generateToken = async function (expiresIn) {
  const customer = this
  const accessToken = jwt.sign({
    _id: customer._id
  }, process.env.SECRET_KEY, { expiresIn: expiresIn || '1hr' })

  return accessToken
}

// Find customer by email address
customerSchema.statics.findByCredentials = async (email) => {
  const customer = await Customer.findOne({ email }).select('-password')

  return customer
}

// Find customer by verify token
customerSchema.statics.verifyToken = async (verify_token) => {
  const customer = await Customer.updateOne({ verify_token }, {
    verified: true,
    verify_token: null
  }).select('-password')
  return customer
}

// Update customer
customerSchema.statics.updateCustomer = async (customerId, customerDetails) => {
  let { password } = customerDetails
  const savedPassword = await Customer.findOne({ _id: customerId }).select('password')

  if (!password) {
    password = savedPassword.password
  } else {
    password = await bcrypt.hash(password, 8)
  }

  const customer = await Customer.updateOne({ _id: customerId }, { ...customerDetails, password })
  return customer
}

// Delete customer by id
customerSchema.statics.deleteCustomer = async (_id) => {
  const customer = await Customer.deleteOne({ _id })
  return customer
}

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer