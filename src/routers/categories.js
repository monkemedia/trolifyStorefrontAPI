const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  getCategories,
  getCategory
} = require('../controller/categories')

// Get categories
router.get('/categories', auth, (req, res) => getCategories(req, res))
// Get category
router.get('/categories/:categoryId', auth, (req, res) => getCategory(req, res))

module.exports = router
