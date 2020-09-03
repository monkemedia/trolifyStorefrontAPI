const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const {
  createCart,
  getCart,
  updateCart,
  deleteCart
} = require('../controller/carts')

// Create cart
router.post('/:storeHash/carts', auth, (req, res) => createCart(req, res))
// Get cart
router.get('/:storeHash/carts/:cartId', auth, (req, res) => getCart(req, res))
// Update cart
router.put('/:storeHash/carts/:cartId', auth, (req, res) => updateCart(req, res))
// Delete cart
router.delete('/:storeHash/carts/:cartId', auth, (req, res) => deleteCart(req, res))

module.exports = router
