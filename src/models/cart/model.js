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

// Update cart
cartSchema.statics.updateCart = async (cartId, data) => {
  const cart = await Cart.updateOne({ _id: cartId }, data)
  return cart
}

// Delete cart
cartSchema.statics.deleteCart = async (cartId) => {
  const cart = await Cart.deleteOne({ _id: cartId })
  return cart
}

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
