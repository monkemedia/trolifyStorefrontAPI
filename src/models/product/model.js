const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const productSchema = require('./schema')

productSchema.plugin(deepPopulate)

// Get all products
productSchema.statics.findProducts = async ({ page, limit, keyword, categories, status, is_featured, sort, price }) => {
  const query = {
    status: status || 'live'
  }
  const sortObj = {
    created_at: 'desc'
  }

  if (categories) {
    Object.assign(query, {
      categories: {
        $in: categories.split(',')
      }
    })
  }

  if (keyword) {
    Object.assign(query, {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { sku: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { search_keywords: { $regex: keyword, $options: 'i' } }
      ]
    })
  }

  if (is_featured) {
    Object.assign(query, { is_featured })
  }

  if (sort) {
    delete sortObj.created_at
    const splitSort = sort.split(':')
    sortObj[splitSort[0]] = splitSort[1]
  }

  if (price) {
    const priceObj = {}
    const priceArray = [].concat(price)

    priceArray.map(p => {
      const splitPrice = p.split(':')
      const greaterLessThan = splitPrice[0] === 'min' ? '$gte' : '$lte'
      priceObj[greaterLessThan] = Number(splitPrice[1])
    })

    Object.assign(query, {
      $or: [
        {
          on_sale: 'true',
          $and: [{
            sale_price: priceObj
          }]
        },
        {
          on_sale: false,
          $and: [{
            price: priceObj
          }]
        }
      ]

    })
  }

  const products = await Product
    .find(query)
    .sort(sortObj)
    .populate('images')
    .deepPopulate('variants.images')
    .skip((page - 1) * limit)
    .limit(limit)
  const total = await Product.countDocuments()
  return {
    data: products,
    meta: {
      pagination: {
        current: page,
        total: products.length
      },
      results: {
        total
      }
    }
  }
}

// Get product
productSchema.statics.findProduct = async (_id) => {
  const product = await Product
    .findOne({ _id })
    .populate('images')
    .deepPopulate('variants.images')
  return product
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product
