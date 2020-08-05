
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
    const categories = query && query.categories
    const status = query && query.status
    const is_featured = query && query.is_featured
    const sort = query && query.sort
    const products = await Product
      .findProducts({
        page,
        limit,
        keyword,
        categories,
        status,
        is_featured,
        sort
      })

    res.status(200).send(products)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getProduct = async (req, res) => {
  const productId = req.params.productId
  const product = await Product.findProduct(productId)

  res.status(200).send(product)
}

module.exports = {
  getProducts,
  getProduct
}
