const Coupon = require('../models/coupon')

const getCouponByCode = async (req, res) => {
  const couponCode = req.params.couponCode

  try {
    const coupon = await Coupon().findCouponByCode(couponCode)

    res.status(200).send(coupon)
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  getCouponByCode
}
