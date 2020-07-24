const { Router } = require('express')
const carts = require('./carts.js')
const categories = require('./categories.js')
const coupons = require('./coupons.js')
const customers = require('./customers/index.js')
const customerAddresses = require('./customers/addresses/index.js')
const customerCoupons = require('./customers/coupons/index.js')
const products = require('./products.js')
const router = Router()

router.use(
  carts,
  coupons,
  customers,
  customerAddresses,
  customerCoupons,
  categories,
  products
)

module.exports = router
