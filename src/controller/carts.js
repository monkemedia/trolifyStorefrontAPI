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
      message: 'Correct Type is required'
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

module.exports = {
  createCart
}
