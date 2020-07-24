const mongoose = require('mongoose')
const couponSchema = require('./schema')
const errorHandler = require('../../utils/errorHandler')

// Get coupon by code
couponSchema.statics.findCouponByCode = async (couponCode) => {
  const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() })

  // Check to see if coupon exists
  if (!coupon) {
    throw errorHandler(422, 'Coupon does not exist.')
  }

  // Check to see if coupon has expired
  if (coupon.expiry && new Date(coupon.expiry).toISOString() < new Date().toISOString()) {
    throw errorHandler(422, 'Coupon has expired.')
  }

  return coupon
}

const Coupon = mongoose.model('coupon', couponSchema)

module.exports = Coupon
