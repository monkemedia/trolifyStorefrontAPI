if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const express = require('express')
const cors = require('cors')
const oauth = require('./routers/oauth.js')
const dbRouters = require('./routers/index.js')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3070
const app = express()

require('./db/db')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/oauth/', oauth)
app.use('/v1/', dbRouters)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
