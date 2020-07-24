const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  cart_state: {
    type: String,
    default: 'active',
    enum: ['active', 'merged', 'ordered']
  },
  customer_id: {
    type: Schema.Types.Mixed
  },
  anonymous_id: {
    type: String
  },
  discount_amount_exc_tax: {
    type: Number
  },
  discount_amount_inc_tax: {
    type: Number
  },
  coupon: {
    id: {
      type: String
    },
    code: {
      type: String
    },
    amount: {
      type: Number
    },
    coupon_type: {
      type: String
    }
  },
  subtotal_exc_tax: {
    type: Number
  },
  subtotal_inc_tax: {
    type: Number
  },
  total_exc_tax: {
    type: Number
  },
  total_inc_tax: {
    type: Number
  },
  shipping_cost_exc_tax: {
    type: Number
  },
  shipping_cost_inc_tax: {
    type: Number
  },
  shipping_method: {
    type: String
  },
  currency_code: {
    type: String,
    default: 'GBP'
  },
  order_is_digital: {
    type: Boolean,
    default: false
  },
  is_email_opt_in: {
    type: Boolean,
    default: false
  },
  billing_address: {
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    company_name: {
      type: String
    },
    line_1: {
      type: String
    },
    line_2: {
      type: String
    },
    city: {
      type: String
    },
    postcode: {
      type: String
    },
    country: {
      type: String
    },
    country_code: {
      type: String
    },
    email: {
      type: String
    },
    phone_number: {
      type: String
    }
  },
  shipping_address: {
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    company_name: {
      type: String
    },
    line_1: {
      type: String
    },
    line_2: {
      type: String
    },
    city: {
      type: String
    },
    postcode: {
      type: String
    },
    country: {
      type: String
    },
    country_code: {
      type: String
    },
    email: {
      type: String
    },
    phone_number: {
      type: String
    }
  },
  products: [{
    product_id: {
      type: String,
      required: true
    },
    variant_id: {
      type: String
    },
    track_inventory: {
      type: String,
      default: 'none'
    },
    name: {
      type: String,
      required: true
    },
    sku: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    sale_price: {
      type: Number
    },
    on_sale: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      default: []
    },
    product_options: [
      {
        _id: false,
        display_name: {
          type: String,
          required: true
        },
        display_value: {
          type: String,
          required: true
        }
      }
    ]
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now,
    expires: 1 * 24 * 60 * 60 * 1000 // 1 day
  }
}, { versionKey: false })

module.exports = cartSchema
