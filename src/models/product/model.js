const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const productSchema = require('./schema')

productSchema.plugin(deepPopulate)

// Get all products
productSchema.statics.findProducts = async ({
  page,
  limit,
  keyword,
  categories,
  status,
  is_featured,
  sort,
  price,
  brand_id,
  custom_fields,
  options
}) => {
  const direction = {
    desc: -1,
    asc: 1
  }
  const query = {
    status: status || 'live'
  }
  const sortObj = {
    created_at: direction.desc
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
    Object.assign(query, { is_featured: Boolean(is_featured) })
  }

  if (brand_id) {
    Object.assign(query, {
      'brand_id.name': brand_id
    })
  }

  if (sort) {
    delete sortObj.created_at
    const splitSort = sort.split(':')
    const [key, value] = splitSort
    sortObj[key] = (direction[value] || direction.desc)
  }

  if (custom_fields) {
    const nameArray = []
    const valueArray = []
    const splitCustomFields = custom_fields.split(',')
    splitCustomFields.map(customField => {
      const splitCustomField = customField.split(':')
      const [name, value] = splitCustomField
      nameArray.push(name)
      valueArray.push(value)
    })

    Object.assign(query, {
      custom_fields: {
        $elemMatch: {
          name: {
            $in: nameArray
          },
          value: {
            $in: valueArray
          }
        }
      }
    })
  }

  if (options) {
    const optionObj = {}
    const optionsArray = [].concat(options.split(','))

    console.log(optionsArray)

    optionsArray.map((o) => {
      const splitOptions = o.split(':')
      console.log('splitoptions', splitOptions)
      const [key, value] = splitOptions
      optionObj[key] = value
    })

    console.log('optionObj', optionObj)

    Object.assign(query, {
      $or: [optionObj]
    })
  }

  if (price) {
    const priceObj = {}
    const priceArray = [].concat(price)

    priceArray.map(p => {
      const splitPrice = p.split(':')
      const [key, value] = splitPrice
      const greaterLessThan = key === 'min' ? '$gte' : '$lte'
      priceObj[greaterLessThan] = Number(value)
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
    .aggregate([
      {
        $lookup: {
          from: 'productimages',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: 'productvariants',
          localField: 'variants',
          foreignField: '_id',
          as: 'variants'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $lookup: {
          from: 'productoptions',
          localField: 'options',
          foreignField: '_id',
          as: 'options'
        }
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand_id',
          foreignField: '_id',
          as: 'brand_id'
        }
      },
      { $unwind: '$brand_id' },
      { $unwind: '$options' },
      { $match: query },
      { $sort: sortObj },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ])

  const total = await Product
    .find(query)
    .sort(sortObj)
    .countDocuments()
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
    .populate('images options custom_fields')
    .deepPopulate('variants.images')
  return product
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product
