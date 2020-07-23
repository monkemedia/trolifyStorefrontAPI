const mongoose = require('mongoose')
const productImageSchema = require('./schema')
const ProductImage = mongoose.model('ProductImage', productImageSchema)

module.exports = ProductImage
