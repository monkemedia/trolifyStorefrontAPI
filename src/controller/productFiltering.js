const ProductFiltering = require('../models/productFiltering')

const getFacets = async (req, res) => {
  try {
    const facets = await ProductFiltering.findFacets()

    res.status(200).send(facets)
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  getFacets
}
