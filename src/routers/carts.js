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
router.post('/carts', auth, (req, res) => createCart(req, res))
// Get cart
router.get('/carts/:cartId', auth, (req, res) => getCart(req, res))
// Update cart
router.put('/carts/:cartId', auth, (req, res) => updateCart(req, res))
// Delete cart
router.delete('/carts/:cartId', auth, (req, res) => deleteCart(req, res))

module.exports = router
