const express = require('express')
const Customer = require('../models/Customers')
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
    const ucustomer = await Customer.findByCredentials(email, password)

    if (!ucustomer) {
      return res.status(401).send({
        error: 'Login failed! Check authentication credentials'
      })
    }

    const token = await ucustomer.generateAuthToken()
    res.send({ ucustomer, token })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
