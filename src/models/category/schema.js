const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  type: {
    type: String
  },
  name: {
    type: String
  },
  slug: {
    type: String
  },
  description: {
    type: String
  },
  parent_id: {
    type: String
  },
  status: {
    type: Object
  }
}, { versionKey: false })

module.exports = categorySchema
