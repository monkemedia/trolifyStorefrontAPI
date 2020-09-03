const ProductImageSchema = require('./schema')
const { tenantModel } = require('../../../utils/multitenancy')
const ProductImage = function () {
  return tenantModel('ProductImage', ProductImageSchema)
}
module.exports = ProductImage
