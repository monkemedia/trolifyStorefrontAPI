const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')

const clientSchema = mongoose.Schema({
  grant_type: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

clientSchema.pre('save', async function (next) {
  // Hash the password before saving the Client model
  const client = this

  if (client.isModified('password')) {
    client.password = await bcrypt.hash(client.password, 8)
  }
  next()
})

clientSchema.methods.generateAccessToken = async function () {
  // Genrate an access token
  const client = this
  const accessToken = jwt.sign({
    _id: client._id,
    grant_type: client.grant_type
  }, process.env.CLIENT_ID, { expiresIn: '1h' })

  return accessToken
}

clientSchema.statics.findByCredentials = async (email, password) => {
  // Search for a Client user by email and password

  const client = await Client.findOne({ email })

  if (!client) {
    throw errorHandler(422, 'Client does\'t exists')
  }

  const isPasswordMatch = await bcrypt.compare(password, client.password)

  if (!isPasswordMatch) {
    throw errorHandler(422, 'Invalid login credentials')
  }

  return client
}

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
