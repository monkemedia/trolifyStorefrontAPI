const express = require('express')
const router = express.Router()
const { auth } = require('../../../middleware/auth')
const {
  createCustomerWishlist,
  getCustomerWishlists,
  getCustomerWishlist,
  updateCustomerWishlist,
  deleteCustomerWishlist
} = require('../../../controller/customers/wishlists')

// Create wishlist
router.post('/customers/:customerId/wishlists', auth, (req, res) => createCustomerWishlist(req, res))
// Get wishlists
router.get('/customers/:customerId/wishlists', auth, (req, res) => getCustomerWishlists(req, res))
// Get wishlist
router.get('/customers/:customerId/wishlists/:wishlistId', auth, (req, res) => getCustomerWishlist(req, res))
// Update wishlist
router.put('/customers/:customerId/wishlists/:wishlistId', auth, (req, res) => updateCustomerWishlist(req, res))
// Delete wishlist
router.delete('/customers/:customerId/wishlists/:wishlistId', auth, (req, res) => deleteCustomerWishlist(req, res))

module.exports = router
