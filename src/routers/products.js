const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  getProducts,
  getProduct
} = require('../controller/products')

// Get products
router.get('/products', auth, (req, res) => getProducts(req, res))
// Get product
router.get('/products/:productId', auth, (req, res) => getProduct(req, res))

module.exports = router
