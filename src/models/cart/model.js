const mongoose = require('mongoose')
const cartSchema = require('./schema')

// Get cart
cartSchema.statics.findCart = async ({ page, limit }) => {
  const cart = await Cart
    .find({})
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await Cart.countDocuments()
  return {
    data: cart,
    meta: {
      pagination: {
        current: page,
        total: cart.length
      },
      results: {
        total
      }
    }
  }
}

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
