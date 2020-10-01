const mongoose = require('mongoose')

exports.checkType = (value, key) => {
  if (value === 'false') {
    return false
  } else if (value === 'true') {
    return true
  } else if (!isNaN(value)) {
    return parseInt(value)
  } else {
    if (key === 'brand_id') {
      return mongoose.Types.ObjectId(value)
    }

    return value
  }
}

exports.priceQuery = (obj) => {
  return {
    $or: [
      {
        on_sale: true,
        $and: [{
          sale_price: obj.price
        }]
      },
      {
        on_sale: false,
        $and: [{
          price: obj.price
        }]
      }
    ]
  }
}
