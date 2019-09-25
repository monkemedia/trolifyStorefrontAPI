const express = require('express')
const Customer = require('../models/Customer')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/customers', async (req, res) => {
  // Create a new customer
  try {
    const customer = new Customer(req.body)
    await customer.save()
    const token = await customer.generateAuthToken()
    res.status(201).send({ customer, token })
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/customers/login', async (req, res) => {
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
    res.send({ customer, token })
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/customers/me', auth, async(req, res) => {
  // View logged in customer profile
  res.send(req.customer)
})

module.exports = router
