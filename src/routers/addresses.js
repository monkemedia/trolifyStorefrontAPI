const express = require('express')
const Address = require('../models/Address')
const auth = require('../middleware/auth')
const router = express.Router()

// Create a new address
router.post('/customers/:id/addresses', auth, async (req, res) => {
  try {

    const address = new Address({...req.body, customer_id: req.params.id })

    await address.save()

    res.status(201).send(address)
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
