const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const { getCouponByCode } = require('../controller/coupons')

// Get couponByCode
router.get('/:storeHash/coupons/:couponCode', auth, (req, res) => getCouponByCode(req, res))

module.exports = router
