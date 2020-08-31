const express = require('express')
const router = express.Router()
const { auth } = require('../../../middleware/auth')
const {
  createCustomerAddress,
  getCustomerAddresses,
  getCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress
} = require('../../../controller/customers/addresses')

// Create address
router.post('/:storeHash/me/customers/addresses', auth, (req, res) => createCustomerAddress(req, res))
// Get addresses
router.get('/:storeHash/me/customers/addresses', auth, (req, res) => getCustomerAddresses(req, res))
// Get address
router.get('/:storeHash/me/customers/addresses/:addressId', auth, (req, res) => getCustomerAddress(req, res))
// Update address
router.put('/:storeHash/me/customers/addresses/:addressId', auth, (req, res) => updateCustomerAddress(req, res))
// Delete address
router.delete('/:storeHash/me/customers/addresses/:addressId', auth, (req, res) => deleteCustomerAddress(req, res))

module.exports = router
