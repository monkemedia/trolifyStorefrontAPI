const express = require('express')
const Address = require('../models/Address')
const auth = require('../middleware/auth')
const router = express.Router()

// Create a new address
router.post('/customers/:id/addresses', auth, async (req, res) => {
  try {
    const addresses = new Address({ ...req.body, customer_id: req.params.id })

    await addresses.save()

    res.status(201).send(addresses)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Get all addresses
router.get('/customers/:id/addresses', auth, async (req, res) => {
  try {
    const addresses = await Address.findAll(req.params.id)

    res.status(201).send(addresses)
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
