const mongoose = require('mongoose')
const productCustomFieldSchema = require('./schema')
const ProductCustomFields = mongoose.model('ProductCustomFields', productCustomFieldSchema)

module.exports = ProductCustomFields
