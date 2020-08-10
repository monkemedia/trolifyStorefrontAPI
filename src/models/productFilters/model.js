const mongoose = require('mongoose')
const productFiltersSchema = require('./schema')
const Product = require('../product')

// Get filters
productFiltersSchema.statics.findFilters = async () => {
  const filters = await Product
    .aggregate([
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
          from: 'brands',
          localField: 'brand_id',
          foreignField: '_id',
          as: 'brands'
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
          from: 'productcustomfields',
          localField: 'custom_fields',
          foreignField: '_id',
          as: 'custom_fields'
        }
      },
      {
        $facet: {
          categories: [
            { $unwind: '$categories' },
            { $group: { _id: '$categories.name', count: { $sum: 1 } } }
          ],
          brands: [
            { $unwind: '$brands' },
            { $group: { _id: '$brands.name', count: { $sum: 1 } } }
          ],
          colours: [
            { $unwind: '$options' },
            {
              $match: { 'options.display_name': 'Colour' }
            },
            { $unwind: '$options.option_values' },
            { $group: { _id: '$options.option_values.label', count: { $sum: 1 } } }

          ],
          sizes: [
            { $unwind: '$options' },
            {
              $match: { 'options.display_name': 'Size' }
            },
            { $unwind: '$options.option_values' },
            { $group: { _id: '$options.option_values.label', count: { $sum: 1 } } }
          ],
          custom_fields_colour: [
            { $unwind: '$custom_fields' },
            {
              $match: { 'custom_fields.name': 'Colour' }
            },
            { $group: { _id: '$custom_fields.value', count: { $sum: 1 } } }
          ],
          custom_fields_size: [
            { $unwind: '$custom_fields' },
            {
              $match: { 'custom_fields.name': 'Size' }
            },
            { $group: { _id: '$custom_fields.value', count: { $sum: 1 } } }
          ],
          custom_fields: [
            { $unwind: '$custom_fields' },
            {
              $match: {
                $and: [
                  { 'custom_fields.name': { $ne: 'Size' } },
                  { 'custom_fields.name': { $ne: 'Colour' } }
                ]
              }
            },
            {
              $group: {
                _id: {
                  name: '$custom_fields.name',
                  value: '$custom_fields.value'
                },
                count: { $sum: 1 }
              }
            }
          ]
        }
      },
      {
        $project: {
          categories: 1,
          brands: 1,
          colours: {
            $setUnion: ['$colours', '$custom_fields_colour']
          },
          sizes: {
            $setUnion: ['$sizes', '$custom_fields_size']
          },
          custom_fields: 1
        }
      }
    ])

  return filters
}

// Get filtersby name
productFiltersSchema.statics.findFilterByName = async (filterName) => {
  const filter = filterName.toLowerCase()
  const filters = await Product
    .aggregate([
      { $unwind: '$filters' },
      {
        $match: {
          'filters.name': { $regex: new RegExp(filter, 'i') }
        }
      },
      {
        $group: {
          _id: {
            name: '$filters.value',
            sort_order: '$filters.sort_order'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.sort_order': 1 } }
    ])

  return filters
}

const Facet = mongoose.model('ProductFilter', productFiltersSchema)

module.exports = Facet
