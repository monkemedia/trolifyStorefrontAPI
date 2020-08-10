const mongoose = require('mongoose')
const brandSchema = require('./schema')
const Brand = mongoose.model('Brand', brandSchema)

module.exports = Brand
