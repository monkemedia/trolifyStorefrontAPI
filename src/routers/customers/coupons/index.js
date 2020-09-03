const express = require('express')
const router = express.Router()
const { auth } = require('../../../middleware/auth')
const {
  createCustomerCoupon,
  getCustomerCoupons,
  getCustomerCoupon,
  incrementCustomerCoupon,
  deleteCustomerCoupon
} = require('../../../controller/customers/coupons')

// Create coupon
router.post('/:storeHash/me/customers/coupons', auth, (req, res) => createCustomerCoupon(req, res))
// Get coupons
router.get('/:storeHash/me/customers/coupons', auth, (req, res) => getCustomerCoupons(req, res))
// Get coupon
router.get('/:storeHash/me/customers/coupons/:couponId', auth, (req, res) => getCustomerCoupon(req, res))
// Increment coupon
router.put('/:storeHash/me/customers/coupons/:couponId', auth, (req, res) => incrementCustomerCoupon(req, res))
// Delete coupon
router.delete('/:storeHash/me/customers/coupons/:couponId', auth, (req, res) => deleteCustomerCoupon(req, res))

module.exports = router
