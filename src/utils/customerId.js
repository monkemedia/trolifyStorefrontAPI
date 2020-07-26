const jwt = require('jsonwebtoken')

module.exports = async (req) => {
  const token = req.header('X-Trolify-Customer-Token')
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

  return decodedToken._id
}
