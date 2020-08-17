const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')
const Customer = require('../models/customer/model')

const auth = async (req, res, next) => {
  let token = req.header('Authorization')

  if (!token) {
    return res.status(422).send(errorHandler(422, 'Bearer token is required'))
  }

  token = token.replace('Bearer ', '')

  try {
    jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch (err) {
    if (err.message === 'jwt expired') {
      return res.status(422).send(errorHandler(422, 'Bearer token has expired'))
    }

    res.status(err.status).send(err)
  }
}

const customerAuth = async (req, res, next) => {
  const token = req.header('X-Trolify-Customer-Token')

  if (!token || token === null || token === 'null') {
    return res.status(422).send(errorHandler(422, 'Customer token is required'))
  }

  try {
    const verifyToken = await jwt.verify(token, process.env.SECRET_KEY)
    const customer = await Customer.findOne({ _id: verifyToken._id })
    if (customer.locked) {
      return res.status(401).send(errorHandler(401, `Sorry, this account has been locked. Please contact us at ${process.env.EMAIL_ADDRESS}`))
    }
    next()
  } catch (err) {
    if (err.message === 'jwt expired') {
      return res.status(422).send(errorHandler(422, 'Customer token has expired'))
    }

    res.status(err.status).send(err)
  }
}

module.exports = {
  auth,
  customerAuth
}
