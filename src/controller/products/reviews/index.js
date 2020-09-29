const ProductReview = require('../../../models/product/reviews/index.js')

const createProductReview = async (req, res) => {
  const data = req.body
  const {
    type,
    title
  } = data
  const productId = req.params.productId

  delete data.status // delete status just incase

  if (!type) {
    return res.status(401).send({
      message: 'Type is required'
    })
  }

  if (type && type !== 'product-review') {
    return res.status(401).send({
      message: 'Correct type is required'
    })
  }

  if (!title) {
    return res.status(401).send({
      message: 'Title is required'
    })
  }

  try {
    const productReview = new ProductReview()({
      product_id: productId,
      status: 'pending',
      ...data
    })
    await productReview.save()

    res.status(201).send(productReview)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getProductReviews = async (req, res) => {
  const query = req.query
  const page = parseInt(query.page) || 1
  const limit = parseInt(query.limit) || 20
  const keyword = query && query.keyword
  let productReviews

  try {
    const productReview = ProductReview()
    const productId = req.params.productId

    if (keyword) {
      productReviews = await productReview.search({ page, keyword, limit })
    } else {
      productReviews = await productReview.findProductReviews({ page, limit, productId })
    }

    res.status(200).send(productReviews)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getProductReview = async (req, res) => {
  const reviewId = req.params.reviewId
  const productId = req.params.productId
  const productReview = await ProductReview().findOne({ _id: reviewId, product_id: productId, status: 'approved' })

  res.status(200).send(productReview)
}

const updateProductReview = async (req, res) => {
  const data = req.body
  const { type } = data
  const productId = req.params.productId
  const reviewId = req.params.reviewId

  if (!type) {
    return res.status(401).send({
      message: 'Type is required'
    })
  }

  if (type && type !== 'product-review') {
    return res.status(401).send({
      message: 'Correct type is required'
    })
  }

  try {
    const productReview = ProductReview()
    await productReview.updateProductReview(reviewId, data)
    const productReviewResponse = await productReview.findOne({ _id: reviewId, product_id: productId })

    res.status(200).send(productReviewResponse)
  } catch (err) {
    res.status(400).send(err)
  }
}

const deleteProductReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId
    const productId = req.params.productId

    await ProductReview().deleteProductReview(reviewId, productId)

    res.status(200).send({
      message: 'Product review successfully deleted'
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  createProductReview,
  getProductReviews,
  getProductReview,
  updateProductReview,
  deleteProductReview
}
