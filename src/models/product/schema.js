const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
  type: {
    type: String
  },
  name: {
    type: String
  },
  slug: {
    type: String
  },
  sku: {
    type: String
  },
  stock: {
    type: Number
  },
  track_inventory: {
    type: String,
    enum: ['none', 'product-inventory', 'variant-inventory'],
    default: 'none'
  },
  status: {
    type: String,
    default: 'draft'
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  sale_price: {
    type: Number
  },
  on_sale: {
    type: Boolean
  },
  commodity_type: {
    type: String
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  brand_id: {
    type: Schema.Types.ObjectId,
    ref: 'Brand'
  },
  search_keywords: {
    type: Array
  },
  total_sold: {
    type: Number
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductImage'
    }
  ],
  variants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductVariants'
    }
  ],
  options: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductOptions'
    }
  ],
  custom_fields: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductCustomFields'
    }
  ],
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  weight: {
    type: Number
  },
  width: {
    type: Number
  },
  depth: {
    type: Number
  },
  height: {
    type: Number
  },
  fixed_shipping_cost: {
    type: Number
  },
  is_free_shipping: {
    type: Boolean
  },
  is_featured: {
    type: Boolean
  }
}, { versionKey: false })

module.exports = productSchema
