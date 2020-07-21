if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const express = require('express')
const routers = require('./routers/index.js')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3070
require('./db/db')

const app = express()

app.use(bodyParser.json())
app.use('/v1/', routers)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
