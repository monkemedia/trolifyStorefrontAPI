const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')
const Customer = require('../models/customer/model')
const { createNamespace } = require('continuation-local-storage')
const session = createNamespace('session')

const setSession = (storeHash, customerId, req, res, next) => {
  console.log('customer', customerId)
  session.bindEmitter(req)
  session.bindEmitter(res)

  session.run(() => {
    session.set('store_hash', storeHash)
    session.set('cust_id', customerId)
    next()
  })
}

const auth = async (req, res, next) => {
  let token = req.header('Authorization')
  const customerToken = req.header('X-Trolify-Customer-Token')
  const storeHash = req.params.storeHash

  if (!token) {
    return res.status(422).send(errorHandler(422, 'Bearer token is required'))
  }

  token = token.replace('Bearer ', '')

  try {
    jwt.verify(token, process.env.SECRET_KEY)

    if (customerToken) {
      const verifyToken = await jwt.verify(customerToken, process.env.SECRET_KEY)
      const customerId = verifyToken._id
      const customer = await Customer(storeHash).findOne({ _id: customerId })

      if (customer.locked) {
        return res.status(401).send(errorHandler(401, `Sorry, this account has been locked. Please contact us at ${process.env.EMAIL_ADDRESS}`))
      }
      setSession(storeHash, customerId, req, res, next)
    } else {
      setSession(storeHash, undefined, req, res, next)
    }
  } catch (err) {
    if (err.message === 'jwt expired') {
      return res.status(422).send(errorHandler(422, 'Bearer token has expired'))
    }

    res.status(err.status).send(err)
  }
}

module.exports = {
  auth
}
