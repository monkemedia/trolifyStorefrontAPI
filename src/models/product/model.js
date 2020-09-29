const mongoose = require('mongoose')
const ProductSchema = require('./schema')
const { tenantModel } = require('../../utils/multitenancy')

// Get all products
ProductSchema.statics.findProducts = async ({
  page,
  limit,
  keyword,
  filter,
  categories,
  status,
  is_featured,
  has_free_shipping,
  sort,
  price,
  brand_id,
  custom_fields,
  options,
  rating
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
    } else {
      console.log('filter', filter)
      Object.keys(filter.reviews_rating_sum).map(key => {
        Object.assign(query, {
          reviews_rating_sum: {
            [key]: parseInt(filter.reviews_rating_sum[key])
          }
        })
      })
    }
  }

  if (sort) {
    delete sortObj.created_at
    Object.keys(sort).map(key => {
      const direction = sort[key] === 'asc' ? 1 : -1
      Object.assign(sortObj, {
        [key]: direction
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

  if (is_featured) {
    Object.assign(query, { is_featured: (is_featured === 'true') })
  }

  if (has_free_shipping) {
    Object.assign(query, { has_free_shipping: (has_free_shipping === 'true') })
  }

  if (brand_id) {
    Object.assign(query, {
      'brand_id.name': brand_id
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

  if (rating) {
    const ratingObj = {}
    const ratingArray = [].concat(rating)

    ratingArray.map(p => {
      const splitRatings = p.split(':')
      const [key, value] = splitRatings
      const greaterLessThan = key === 'min' ? '$gte' : '$lte'
      ratingObj[greaterLessThan] = Number(value)
    })

    Object.assign(query, {
      reviews_rating_sum: ratingObj
    })
  }

  console.log('query', query)
  const product = new Product()
  const products = await product
    .aggregate([
      {
        $match: query
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
