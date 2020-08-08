const Facet = require('../models/facet')

const getFacets = async (req, res) => {
  try {
    const facets = await Facet.findFacets()

    res.status(200).send(facets)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getFacetByName = async (req, res) => {
  const facetName = req.params.facetName

  try {
    const facets = await Facet.findFacetByName(facetName)

    res.status(200).send(facets)
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  getFacets,
  getFacetByName
}
