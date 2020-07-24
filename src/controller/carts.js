const Cart = require('../models/cart')

const createCart = async (req, res) => {
  const data = req.body
  const { type } = data

  if (!type) {
    return res.status(401).send({
      message: 'Type is required'
    })
  }

  if (type && type !== 'carts') {
    return res.status(401).send({
      message: 'Correct type is required'
    })
  }

  try {
    const carts = new Cart(data)

    await carts.save()

    res.status(201).send(carts)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getCart = async (req, res) => {
  const cartId = req.params.cartId

  try {
    const cart = await Cart.findOne({ _id: cartId })
    res.status(200).send(cart)
  } catch (err) {
    res.status(400).send(err)
  }
}

const updateCart = async (req, res) => {
  const cartId = req.params.cartId
  const data = req.body
  const { type, cart_state } = data

  if (!type) {
    return res.status(401).send({
      message: 'Type is required'
    })
  }

  if (type !== 'carts') {
    return res.status(401).send({
      message: 'Correct type is required'
    })
  }

  if (cart_state !== 'ordered') {
    return res.status(401).send({
      message: 'The cart has been ordered. No further operations are allowed'
    })
  }

  try {
    await Cart.updateCart(cartId, data)
    const cart = await Cart.findOne({ _id: cartId })

    res.status(200).send(cart)
  } catch (err) {
    res.status(400).send(err)
  }
}

const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cartId

    await Cart.deleteCart(cartId)

    res.status(200).send({
      message: 'Cart successfully deleted'
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteCart
}
