const express = require('express')
const routers = require('./routers/index.js')
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(express.json())
app.use('/v1/', routers)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
