const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const {
  createPayment,
  getPayment
} = require('../controller/payments')

// Create new Payment Account
router.post('/:storeHash/payments', auth, (req, res) => createPayment(req, res))
// Get payment
router.get('/:storeHash/payments/:paymentId', auth, (req, res) => getPayment(req, res))

module.exports = router
