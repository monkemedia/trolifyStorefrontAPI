const express = require('express')
const router = express.Router()
const {
  generateAccessToken
} = require('../controller/oauth')

// Get access token when user logins in
router.post('/access_token', (req, res) => generateAccessToken(req, res))

module.exports = router
