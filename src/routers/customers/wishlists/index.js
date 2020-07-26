const express = require('express')
const router = express.Router()
const { auth, customerAuth } = require('../../../middleware/auth')
const {
  createCustomerWishlist,
  getCustomerWishlists,
  getCustomerWishlist,
  updateCustomerWishlist,
  deleteCustomerWishlist
} = require('../../../controller/customers/wishlists')

// Create wishlist
router.post('/customers/:customerId/wishlists', [auth, customerAuth], (req, res) => createCustomerWishlist(req, res))
// Get wishlists
router.get('/customers/:customerId/wishlists', [auth, customerAuth], (req, res) => getCustomerWishlists(req, res))
// Get wishlist
router.get('/customers/:customerId/wishlists/:wishlistId', [auth, customerAuth], (req, res) => getCustomerWishlist(req, res))
// Update wishlist
router.put('/customers/:customerId/wishlists/:wishlistId', [auth, customerAuth], (req, res) => updateCustomerWishlist(req, res))
// Delete wishlist
router.delete('/customers/:customerId/wishlists/:wishlistId', [auth, customerAuth], (req, res) => deleteCustomerWishlist(req, res))

module.exports = router
