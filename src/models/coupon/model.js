const CouponSchema = require('./schema')
const errorHandler = require('../../utils/errorHandler')
const { tenantModel } = require('../../utils/multitenancy')

// Get coupon by code
CouponSchema.statics.findCouponByCode = async (couponCode) => {
  const coupon = await Coupon().findOne({ code: couponCode.toUpperCase() })

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

const Coupon = function () {
  return tenantModel('Coupon', CouponSchema)
}
module.exports = Coupon
