const Category = require('../models/category')

const getCategories = async (req, res) => {
  const query = req.query
  const page = parseInt(query.page) || 1
  const limit = parseInt(query.limit) || 20

  try {
    const categories = await Category.findCategories({ page, limit })

    res.status(200).send(categories)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getCategory = async (req, res) => {
  const categoryId = req.params.categoryId

  try {
    const category = await Category.findOne({ _id: categoryId })
    res.status(200).send(category)
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  getCategories,
  getCategory
}
