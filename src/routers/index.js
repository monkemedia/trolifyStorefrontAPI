const { Router } = require('express')
const carts = require('./carts.js')
const categories = require('./categories.js')
const products = require('./products.js')
const router = Router()

router.use(
  carts,
  categories,
  products
)

module.exports = router
