const { tenantModel } = require('../../utils/multitenancy')
const CartSchema = require('./schema')

// Get cart
CartSchema.statics.findCart = async ({ page, limit }) => {
  const cart = Cart()
  const cartResponse = await cart
    .find({})
    .select('expireAt')
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await cart.countDocuments()
  return {
    data: cartResponse,
    meta: {
      pagination: {
        current: page,
        total: cartResponse.length
      },
      results: {
        total
      }
    }
  }
}

// Update cart
CartSchema.statics.updateCart = async (cartId, data) => {
  const cartResponse = await Cart().updateOne({ _id: cartId }, {
    ...data,
    updated_at: Date.now()
  })
  return cartResponse
}

// Delete cart
CartSchema.statics.deleteCart = async (cartId) => {
  const cartResponse = await Cart().deleteOne({ _id: cartId })
  return cartResponse
}

const Cart = function () {
  return tenantModel('Cart', CartSchema)
}
module.exports = Cart
