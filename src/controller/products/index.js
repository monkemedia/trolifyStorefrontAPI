
require('../../models/product/images')
require('../../models/product/option')
require('../../models/product/customField')
require('../../models/product/variant')
require('../../models/product/variant/images')
const Product = require('../../models/product')

const getProducts = async (req, res) => {
  try {
    const query = req.query
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 20
    const filter = query && query.filter
    const keyword = query && query.keyword
    const categories = query && query.categories
    const sort = query && query.sort
    const custom_fields = query && query.custom_fields
    const options = query && query.options
    const products = await Product()
      .findProducts({
        page,
        limit,
        filter,
        keyword,
        categories,
        sort,
        custom_fields,
        options
      })

    res.status(200).send(products)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getProduct = async (req, res) => {
  const productId = req.params.productId
  const product = await Product().findProduct(productId)

  res.status(200).send(product)
}

module.exports = {
  getProducts,
  getProduct
}
