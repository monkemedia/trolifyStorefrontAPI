const CustomerWishlistSchema = require('./schema')
const { tenantModel } = require('../../../utils/multitenancy')

// Find wishlists
CustomerWishlistSchema.statics.findCustomerWishlists = async (customerId) => {
  const wishlists = await CustomerWishlist().find({ customer_id: customerId })
  return wishlists
}

// Find wishlist
CustomerWishlistSchema.statics.findCustomerWishlist = async (wishlistId) => {
  const wishlist = await CustomerWishlist().findOne({ _id: wishlistId })
  return wishlist
}

// Update wishlist
CustomerWishlistSchema.statics.updateCustomerWishlist = async (wishlistId, data) => {
  const wishlist = await CustomerWishlist().updateOne({ _id: wishlistId }, data)
  return wishlist
}

// Delete wishlist
CustomerWishlistSchema.statics.deleteCustomerWishlist = async (wishlistId) => {
  const wishlist = await CustomerWishlist().deleteOne({ _id: wishlistId })
  return wishlist
}

const CustomerWishlist = function () {
  return tenantModel('CustomerWishlist', CustomerWishlistSchema)
}
module.exports = CustomerWishlist
