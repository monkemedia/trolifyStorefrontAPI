const express = require('express')
const router = express.Router()
const { auth } = require('../../middleware/auth')
const {
  createOrder,
  getOrders,
  getOrder
} = require('../../controller/orders')

// Create order
router.post('/:storeHash/me/orders', auth, (req, res) => createOrder(req, res))
// Get orders
router.get('/:storeHash/me/orders', auth, (req, res) => getOrders(req, res))
// Get order
router.get('/:storeHash/me/orders/:orderId', auth, (req, res) => getOrder(req, res))

module.exports = router
