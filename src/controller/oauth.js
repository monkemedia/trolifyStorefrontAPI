const jwt = require('jsonwebtoken')

const generateAccessToken = async (req, res) => {
  try {
    const { grant_type, client_id } = req.body

    if (!grant_type) {
      return res.status(401).send({
        message: 'Type is required'
      })
    }

    if (grant_type !== 'implicit') {
      return res.status(401).send({
        message: 'Correct type is required'
      })
    }

    if (!client_id) {
      return res.status(401).send({
        message: 'Client ID is required'
      })
    }

    const accessToken = jwt.sign({
      client_id,
      type: grant_type
    }, process.env.SECRET_KEY, { expiresIn: '1hr' })

    res.status(200).send({
      type: 'client_credentials',
      access_token: accessToken,
      identifier: 'implicit',
      token_type: 'Bearer',
      expires: Math.floor(Date.now() / 1000) + (60 * 60)
    })
  } catch (err) {
    console.log('ERROR', err)
    res.status(err.status).send(err)
  }
}

module.exports = {
  generateAccessToken
}
