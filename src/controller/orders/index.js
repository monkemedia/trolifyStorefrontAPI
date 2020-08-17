const Order = require('../../models/order/index.js')
const customerId = require('../../utils/customerId')
const emailTemplate = require('../../utils/emailTemplate')

const createOrder = async (req, res) => {
  const data = req.body
  const { type, products, billing_address, shipping_address, send_invoice } = data

  if (!type) {
    return res.status(401).send({
      message: 'Type is required'
    })
  }

  if (type && type !== 'order') {
    return res.status(401).send({
      message: 'Correct type is required'
    })
  }

  if (!products) {
    return res.status(401).send({
      message: 'Products is required'
    })
  }

  if (products.length < 1) {
    return res.status(401).send({
      message: 'Products must be populated'
    })
  }

  if (!billing_address) {
    return res.status(401).send({
      message: 'Billing address is required'
    })
  }

  if (!shipping_address) {
    data.shipping_address = billing_address
  }

  try {
    const order = new Order(data)

    await order.save()

    if (send_invoice) {
      await emailTemplate.orderInvoice({
        email: billing_address.email
      })
    }

    res.status(201).send(order)
  } catch (err) {
    let error = {}
    err.message ? error.message = err.message : error = err
    res.status(400).send(error)
  }
}

const getOrders = async (req, res) => {
  try {
    const query = req.query
    const page = parseInt(query.page)
    const limit = parseInt(query.limit)
    const custId = await customerId(req)

    const orders = await Order.findOrdersByCustomerId({ page, limit, customerId: custId })

    res.status(200).send(orders)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getOrder = async (req, res) => {
  const orderId = req.params.orderId

  let order
  if (orderId === 'count') {
    order = await Order.getCount()
  } else {
    order = await Order.findOne({ id: req.params.orderId })
  }

  res.status(200).send(order)
}

module.exports = {
  createOrder,
  getOrders,
  getOrder
}
