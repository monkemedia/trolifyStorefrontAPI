const mongoose = require('mongoose')
const ProductSchema = require('./schema')
const { tenantModel } = require('../../utils/multitenancy')

function checkType (value) {
  if (value === 'false') {
    return false
  } else if (value === 'true') {
    return true
  } else if (!isNaN(value)) {
    return parseInt(value)
  }
}

// Get all products
ProductSchema.statics.findProducts = async ({
  page,
  limit,
  keyword,
  filter,
  categories,
  status,
  sort,
  custom_fields,
  options
}) => {
  const direction = {
    desc: -1,
    asc: 1
  }
  const query = {
    status: {
      $eq: status || 'live'
    }
  }
  const sortObj = {
    created_at: direction.desc
  }

  if (filter) {
    if (filter.brand_id) {
      Object.keys(filter.brand_id).map(key => {
        Object.assign(query, {
          brand_id: {
            [key]: mongoose.Types.ObjectId(filter.brand_id[key])
          }
        })
      })
    } else if (filter.price) {
      const priceObj = {}
      Object.keys(filter.price).map(key => {
        priceObj[key] = checkType(filter.price[key])
      })
      Object.assign(query, {
        $or: [
          {
            on_sale: true,
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
    } else {
      const obj = {}
      Object.keys(filter).map(value => {
        obj[value] = {}
        Object.keys(filter[value]).map(key => {
          obj[value][key] = checkType(filter[value][key])
        })
      })
      Object.assign(query, obj)
    }
  }

  if (sort) {
    delete sortObj.created_at
    Object.keys(sort).map(key => {
      Object.assign(sortObj, {
        [key]: direction[sort[key]]
      })
    })
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

    optionsArray.map((o) => {
      const splitOptions = o.split(':')
      const [key, value] = splitOptions
      const arr = optionObj[key] ? [].concat(optionObj[key]) : []

      optionObj[key] = arr
      optionObj[key].push(value)
    })

    const opt = []

    for (const [key, value] of Object.entries(optionObj)) {
      opt.push({
        options: {
          $elemMatch: {
            display_name: key,
            'option_values.label': {
              $in: value
            }
          }
        }
      })
    }

    Object.assign(query, {
      $or: opt
    })
  }

  console.log('query', query)
  console.log('sort', sortObj)
  const product = new Product()
  const products = await product
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
          from: 'productreviews',
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          reviews_rating_average: { $ifNull: [{ $avg: '$reviews.rating' }, 0] },
          reviews_count: { $size: '$reviews' }
        }
      },
      {
        $match: query
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      { $sort: sortObj }
    ])

  const total = await product
    .find(query)
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
ProductSchema.statics.findProduct = async (id) => {
  const product = await Product()
    .aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) }
      },
      {
        $limit: 1
      },
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
          from: 'productreviews',
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          reviews_rating_average: { $ifNull: [{ $avg: '$reviews.rating' }, 0] },
          reviews_count: { $size: '$reviews' }
        }
      }
    ])
  return product[0]
}

const Product = function () {
  return tenantModel('Product', ProductSchema)
}
module.exports = Product
