const { Router } = require('express')
const categories = require('./categories.js')
const products = require('./products.js')
const router = Router()

router.use(
  categories,
  products
)

module.exports = router
