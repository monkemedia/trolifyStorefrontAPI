const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const {
  getFacets,
  getFacetByName
} = require('../controller/facets')

// Get facets
router.get('/facets', auth, (req, res) => getFacets(req, res))

// Get facet
router.get('/facets/:facetName', auth, (req, res) => getFacetByName(req, res))

module.exports = router
