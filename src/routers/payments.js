const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const {
  createPayment
} = require('../controller/payments')

// Create new Payment Account
router.post('/:storeHash/payments', auth, (req, res) => createPayment(req, res))

module.exports = router
