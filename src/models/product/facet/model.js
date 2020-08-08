const mongoose = require('mongoose')
const productFacetSchema = require('./schema')
const ProductFacets = mongoose.model('ProductFacets', productFacetSchema)

module.exports = ProductFacets
