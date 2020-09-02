const ProductVariantSchema = require('./schema')
const { tenantModel } = require('../../../utils/multitenancy')
const ProductVariant = function () {
  return tenantModel('ProductVariant', ProductVariantSchema)
}
module.exports = ProductVariant
