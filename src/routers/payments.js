const express = require('express')
const router = express.Router()
const { auth, customerAuth } = require('../middleware/auth')
const {
  createPayment,
  getPayment
} = require('../controller/payments')

// Create new Payment Account
router.post('/payments', [auth, customerAuth], (req, res) => createPayment(req, res))
// Get payment
router.get('/payments/:paymentId', [auth, customerAuth], (req, res) => getPayment(req, res))

module.exports = router
