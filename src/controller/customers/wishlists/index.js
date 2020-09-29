const cls = require('cls-hooked')
const session = cls.getNamespace('session')
const CustomerWishlist = require('../../../models/customer/wishlist')

const createCustomerWishlist = async (req, res) => {
  const data = req.body
  const {
    type,
    name
  } = data
  const custId = session.get('cust_id')

  if (!type) {
    return res.status(401).send({
      message: 'Type is required'
    })
  }

  if (type && type !== 'customer-wishlist') {
    return res.status(401).send({
      message: 'Correct type is required'
    })
  }

  if (!name) {
    return res.status(401).send({
      message: 'Name is required'
    })
  }

  try {
    const customerWishlist = new CustomerWishlist({ ...data, customer_id: custId })

    await customerWishlist.save()

    res.status(201).send(customerWishlist)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getCustomerWishlists = async (req, res) => {
  try {
    const custId = session.get('cust_id')
    const customerWishlistes = await CustomerWishlist.findCustomerWishlists(custId)

    res.status(200).send(customerWishlistes)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getCustomerWishlist = async (req, res) => {
  try {
    const wishlistId = req.params.wishlistId
    const customerWishlist = await CustomerWishlist.findCustomerWishlist(wishlistId)

    res.status(200).send(customerWishlist)
  } catch (err) {
    res.status(400).send(err)
  }
}

const updateCustomerWishlist = async (req, res) => {
  const wishlistId = req.params.wishlistId
  const data = req.body
  const { type } = data

  if (!type) {
    return res.status(401).send({
      message: 'Type is required'
    })
  }

  if (type && type !== 'customer-wishlist') {
    return res.status(401).send({
      message: 'Correct type is required'
    })
  }

  try {
    await CustomerWishlist.updateCustomerWishlist(wishlistId, data)
    const customerWishlist = await CustomerWishlist.findCustomerWishlist(wishlistId)

    res.status(200).send(customerWishlist)
  } catch (err) {
    res.status(400).send(err)
  }
}

const deleteCustomerWishlist = async (req, res) => {
  try {
    const wishlistId = req.params.wishlistId

    await CustomerWishlist.deleteCustomerWishlist(wishlistId)

    res.status(200).send({
      message: 'Customer wishlist successfully deleted'
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  createCustomerWishlist,
  getCustomerWishlists,
  getCustomerWishlist,
  updateCustomerWishlist,
  deleteCustomerWishlist
}
