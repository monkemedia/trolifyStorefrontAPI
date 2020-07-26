const mongoose = require('mongoose')
const customerWishlistSchema = require('./schema')

// Find wishlists
customerWishlistSchema.statics.findCustomerWishlists = async (customerId) => {
  const wishlists = await CustomerWishlist.find({ customer_id: customerId })
  return wishlists
}

// Find wishlist
customerWishlistSchema.statics.findCustomerWishlist = async (wishlistId) => {
  const wishlist = await CustomerWishlist.findOne({ _id: wishlistId })
  return wishlist
}

// Update wishlist
customerWishlistSchema.statics.updateCustomerWishlist = async (wishlistId, data) => {
  const wishlist = await CustomerWishlist.updateOne({ _id: wishlistId }, data)
  return wishlist
}

// Delete wishlist
customerWishlistSchema.statics.deleteCustomerWishlist = async (wishlistId) => {
  const wishlist = await CustomerWishlist.deleteOne({ _id: wishlistId })
  return wishlist
}

const CustomerWishlist = mongoose.model('CustomerWishlist', customerWishlistSchema)

module.exports = CustomerWishlist
