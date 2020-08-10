const ProductFilter = require('../models/productFilters')

const getFilters = async (req, res) => {
  try {
    const filters = await ProductFilter.findFilters()

    res.status(200).send(filters)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getFilterByName = async (req, res) => {
  const facetName = req.params.facetName

  try {
    const filters = await ProductFilter.findFilterByName(facetName)

    res.status(200).send(filters)
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  getFilters,
  getFilterByName
}
