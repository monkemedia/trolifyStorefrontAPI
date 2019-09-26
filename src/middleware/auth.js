const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')

const auth = async (req, res, next) => {
  let token = req.header('Authorization')

  if (!token) {
    res.status(401).send({
      error: 'Token is required'
    })
  }

  token = token.replace('Bearer ', '')

  try {
    await jwt.verify(token, process.env.JWT_KEY)
    const customer = await Customer.findOne({ _id: req.params.id })

    if (!customer) {
      throw new Error({
        error: 'Customer doesn`t exist'
      })
    }

    req.customer = customer
    req.token = token
    next()
  } catch (err) {
    res.status(401).send({
      error: 'Token has expired'
    })
  }
}

module.exports = auth
