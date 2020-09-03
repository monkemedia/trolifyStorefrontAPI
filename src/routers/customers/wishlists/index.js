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
router.post('/:storeHash/me/customers/wishlists', auth, (req, res) => createCustomerWishlist(req, res))
// Get wishlists
router.get('/:storeHash/me/customers/wishlists', auth, (req, res) => getCustomerWishlists(req, res))
// Get wishlist
router.get('/:storeHash/me/customers/wishlists/:wishlistId', auth, (req, res) => getCustomerWishlist(req, res))
// Update wishlist
router.put('/:storeHash/me/customers/wishlists/:wishlistId', auth, (req, res) => updateCustomerWishlist(req, res))
// Delete wishlist
router.delete('/:storeHash/me/customers/wishlists/:wishlistId', auth, (req, res) => deleteCustomerWishlist(req, res))

module.exports = router
