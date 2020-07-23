const express = require('express')
const router = express.Router()
const { auth, customerAuth } = require('../../middleware/auth')
const {
  createCustomer,
  getCustomer,
  getCustomerTokens,
  updateCustomer,
  deleteCustomer
  // resendVerificationEmail,
  // verifyCustomer
} = require('../../controller/customers')

// Create customer
router.post('/customers', auth, (req, res) => createCustomer(req, res))
// Get customer token
router.post('/customers/tokens', auth, (req, res) => getCustomerTokens(req, res))
// Get customer
router.get('/customers/:customerId', [auth, customerAuth], (req, res) => getCustomer(req, res))
// Update customer
router.put('/customers/:customerId', [auth, customerAuth], (req, res) => updateCustomer(req, res))
// Delete customer
router.delete('/customers/:customerId', [auth, customerAuth], (req, res) => deleteCustomer(req, res))
// // Resend verification email
// router.post('/customers/resend/:customerId', auth, (req, res) => resendVerificationEmail(req, res))
// // Verify customer email address
// router.post('/customers/verify', (req, res) => verifyCustomer(req, res))

module.exports = router
