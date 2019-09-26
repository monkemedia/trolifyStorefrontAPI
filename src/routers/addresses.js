const express = require('express')
const Address = require('../models/Address')
const auth = require('../middleware/auth')
const router = express.Router()

// Create a new address
router.post('/customers/:customerId/addresses', auth, async (req, res) => {
  try {
    const addresses = new Address({ ...req.body, customer_id: req.params.customerId })

    await addresses.save()

    res.status(201).send(addresses)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Get all addresses
router.get('/customers/:customerId/addresses', auth, async (req, res) => {
  try {
    const addresses = await Address.findAllAddresses(req.params.customerId)

    res.status(201).send(addresses)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Get an address
router.get('/customers/:customerId/addresses/:addressId', auth, async (req, res) => {
  try {
    const addresses = await Address.findAddress(req.params.addressId)

    res.status(201).send(addresses)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Delete an address
router.delete('/customers/:customerId/addresses/:addressId', auth, async (req, res) => {
  try {
    const addresses = await Address.deleteAddress(req.params.addressId)

    res.status(201).send({
      message: 'Address successfully deleted'
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
