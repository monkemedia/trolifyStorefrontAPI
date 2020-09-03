const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const {
  getFacets
  // getFilterByName
} = require('../controller/productFiltering')

// Get filters
router.get('/:storeHash/product-filtering', auth, (req, res) => getFacets(req, res))

// Get filter
// router.get('/product-filters/:filterName', auth, (req, res) => getFilterByName(req, res))

module.exports = router
