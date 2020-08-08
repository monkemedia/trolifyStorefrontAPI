const mongoose = require('mongoose')
const facetSchema = require('./schema')
const Product = require('../product')

// Get facets
facetSchema.statics.findFacets = async () => {
  const facets = await Product
    .aggregate([
      { $unwind: '$facets' },
      {
        $group: {
          _id: '$facets.name',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

  return facets
}

// Get facets by name
facetSchema.statics.findFacetByName = async (facetName) => {
  const facet = facetName.toLowerCase()
  const facets = await Product
    .aggregate([
      { $unwind: '$facets' },
      {
        $match: {
          'facets.name': { $regex: new RegExp(facet, 'i') }
        }
      },
      {
        $group: {
          _id: '$facets.value',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

  return facets
}

const Facet = mongoose.model('Facet', facetSchema)

module.exports = Facet
