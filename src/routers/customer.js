const express = require('express')
const Customer = require('../models/Customer')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/customers', async (req, res) => {
  // Create a new customer
  try {
    // Check to see if customer already exists
    const customerExists = await Customer.findByEmail(req.body.email)

    if (customerExists) {
      return res.status(401).send({
        error: 'Customer already exists'
      })
    }

    const customer = new Customer(req.body)
    
    await customer.save()

    const { _id, name, email, password } = customer

    res.status(201).send({
      type: 'customer',
      _id,
      name,
      email,
      password: password ? true : false
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/customers/token', async (req, res) => {
  // Login a registerd customer
  try {
    const { email, password } = req.body
    const customer = await Customer.findByCredentials(email, password)

    if (!customer) {
      return res.status(401).send({
        error: 'Login failed! Check authentication credentials'
      })
    }

    const token = await customer.generateAuthToken()
    res.send({
      type: 'token',
      customer_id: customer._id,
      token: token
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/customers/:id', auth, async(req, res) => {
  // View logged in customer profile
  const { _id, name, email, password } = req.customer
  res.status(201).send({
    type: 'customer',
    _id,
    name,
    email,
    password: password ? true : false
  })
})

module.exports = router
