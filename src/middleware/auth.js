const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')

const auth = async (req, res, next) => {
  let token = req.header('Authorization')

  if (!token) {
    return res.status(422).send({
      status: 422,
      message: 'Token is required'
    })
  }

  token = token.replace('Bearer ', '')

  try {
    const verify = await jwt.verify(token, process.env.JWT_KEY)
    const customer = await Customer.findOne({ _id: req.params.id })

    if (!customer) {
      throw {
        status: 422,
        message: 'Customer does\'t exists'
      }
    }

    req.customer = customer
    req.token = token
    next()
  } catch (err) {
    if (err.message === 'jwt expired') {
      return res.status(422).send({
        status: 422,
        message: 'Token has expired'
      })
    }

    res.status(err.status).send(err)
  }
}

module.exports = auth
