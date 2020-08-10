const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const {
  getFilters,
  getFilterByName
} = require('../controller/productFilters')

// Get filters
router.get('/product-filters', auth, (req, res) => getFilters(req, res))

// Get filter
router.get('/product-filters/:filterName', auth, (req, res) => getFilterByName(req, res))

module.exports = router
