const express = require('express')
const customerRouter = require('./routers/customer.js')
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(express.json())
app.use('/v1/', customerRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
