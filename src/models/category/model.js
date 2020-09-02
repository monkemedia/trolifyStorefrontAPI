const { tenantModel } = require('../../utils/multitenancy')
const CategorySchema = require('./schema')

// Get categories
CategorySchema.statics.findCategories = async ({ page, limit }) => {
  const category = Category()
  const categories = await category
    .find({})
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await category.countDocuments()
  return {
    data: categories,
    meta: {
      pagination: {
        current: page,
        total: categories.length
      },
      results: {
        total
      }
    }
  }
}

const Category = function () {
  return tenantModel('Category', CategorySchema)
}
module.exports = Category
