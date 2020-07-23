const mongoose = require('mongoose')
const productVariantImageSchema = require('./schema')
const ProductVariantImage = mongoose.model('ProductVariantImage', productVariantImageSchema)

module.exports = ProductVariantImage
