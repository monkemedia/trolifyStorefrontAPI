const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  customer_id: {
    type: Schema.Types.Mixed
  },
  status_id: {
    type: Number
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
  refunded_shipping: {
    type: Boolean,
    default: false
  },
  currency_code: {
    type: String
  },
  payment_method: {
    type: String
  },
  payment_provider_id: {
    type: String
  },
  payment_status: {
    type: String
  },
  refunded_amount: {
    type: Number,
    defualt: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  order_is_digital: {
    type: Boolean,
    default: false
  },
  is_email_opt_in: {
    type: Boolean,
    default: false
  },
  comments: {
    type: String
  },
  staff_notes: {
    type: String
  },
  billing_address: {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    company_name: {
      type: String
    },
    line_1: {
      type: String,
      required: true
    },
    line_2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    country_code: {
      type: String,
      required: true
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
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    company_name: {
      type: String
    },
    line_1: {
      type: String,
      required: true
    },
    line_2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    country_code: {
      type: String,
      required: true
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
      type: String,
      default: null
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
      type: Number
    },
    sale_price: {
      type: Number
    },
    on_sale: {
      type: Boolean,
      default: false
    },
    refunded_amount: {
      type: Number
    },
    refund_reason: {
      type: String
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
  }]
}, { versionKey: false })

module.exports = orderSchema
