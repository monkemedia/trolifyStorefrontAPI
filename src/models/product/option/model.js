const mongoose = require('mongoose')
const productOptionSchema = require('./schema')
const ProductOptions = mongoose.model('ProductOptions', productOptionSchema)

module.exports = ProductOptions
