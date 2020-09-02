const ProductOptionSchema = require('./schema')
const { tenantModel } = require('../../../utils/multitenancy')
const ProductOption = function () {
  return tenantModel('ProductOption', ProductOptionSchema)
}
module.exports = ProductOption
