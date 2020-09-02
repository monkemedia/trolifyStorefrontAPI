const ProductVariantImageSchema = require('./schema')
const { tenantModel } = require('../../../../utils/multitenancy')
const ProductVariantImage = function () {
  return tenantModel('ProductVariantImage', ProductVariantImageSchema)
}
module.exports = ProductVariantImage
