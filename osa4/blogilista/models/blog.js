const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  const Blog = mongoose.model('Blog', blogSchema)
  
  const mongoUrl = config.MONGO_URL
  
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

  module.exports = Blog