const ProductCustomFieldSchema = require('./schema')
const { tenantModel } = require('../../../utils/multitenancy')
const ProductCustomField = function () {
  return tenantModel('ProductCustomField', ProductCustomFieldSchema)
}
module.exports = ProductCustomField
