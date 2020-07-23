const { Router } = require('express')
const categories = require('./categories.js')
const customers = require('./customers/index.js')
const customerAddresses = require('./customers/addresses/index.js')
const customerCoupons = require('./customers/coupons/index.js')
const products = require('./products.js')
const router = Router()

router.use(
  customers,
  customerAddresses,
  customerCoupons,
  categories,
  products
)

module.exports = router
