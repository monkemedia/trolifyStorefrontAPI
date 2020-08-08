
require('../models/product/images')
require('../models/product/option')
require('../models/product/facet')
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
    const brand_id = query && query.brand_id
    const sort = query && query.sort
    const price = query && query.price
    const facets = query && query.facets
    const products = await Product
      .findProducts({
        page,
        limit,
        keyword,
        categories,
        status,
        is_featured,
        brand_id,
        sort,
        price,
        facets
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
