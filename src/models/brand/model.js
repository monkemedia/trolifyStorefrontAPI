const { tenantModel } = require('../../utils/multitenancy')
const BrandSchema = require('./schema')
const Brand = function () {
  return tenantModel('Brand', BrandSchema)
}
module.exports = Brand
