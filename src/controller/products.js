
require('../models/product/images')
require('../models/product/variant')
require('../models/product/variant/images')
const Product = require('../models/product')

const getProducts = async (req, res) => {
  try {
    const query = req.query
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 20
    const keyword = query && query.keyword
    let products

    if (keyword) {
      products = await Product.search({ page, keyword, limit })
    } else {
      products = await Product.findProducts({ page, limit })
    }
    res.status(200).send(products)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getProduct = async (req, res) => {
  const productId = req.params.productId
  let product
  if (productId === 'count') {
    product = await Product.getCount()
  } else {
    product = await Product.findProduct(productId)
  }

  res.status(200).send(product)
}

module.exports = {
  getProducts,
  getProduct
}
