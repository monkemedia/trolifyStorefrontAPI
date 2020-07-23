const mongoose = require('mongoose')
const categorySchema = require('./schema')

// Get categories
categorySchema.statics.findCategories = async ({ page, limit }) => {
  const categories = await Category
    .find({})
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await Category.countDocuments()
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

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
