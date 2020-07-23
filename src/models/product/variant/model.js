const mongoose = require('mongoose')
const productVariantSchema = require('./schema')
const ProductVariants = mongoose.model('ProductVariants', productVariantSchema)

module.exports = ProductVariants
