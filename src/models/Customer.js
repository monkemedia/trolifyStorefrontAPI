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
  }
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
  }, process.env.JWT_KEY, { expiresIn: 60 })

  return token
}

customerSchema.statics.findByEmail = async (email) => {
  // Search for a customer by email address
 const customer = await Customer.findOne({ email })
 return customer
}

customerSchema.statics.findByCredentials = async (email, password) => {
  // Search for a customer by email and password
  const customer = await Customer.findOne({ email })

  if (!customer) {
    throw {
      status: 422,
      message: 'Customer does\'t exists'
    }
  }

  const isPasswordMatch = await bcrypt.compare(password, customer.password)

  if (!isPasswordMatch) {
    throw {
      status: 422,
      message: 'Invalid login credentials'
    }
  }

  return customer
}

customerSchema.statics.deleteById = async (_id) => {
  // Search for a customer by email address
 const customer = await Customer.deleteOne({ _id })
 return customer
}

customerSchema.statics.updateById = async (customerDetails) => {
  const { _id, name, email, password } = customerDetails
  // Search for a customer by email address
 const customer = await Customer.updateOne({ _id }, { name, email, password })
 return customer
}

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
  
