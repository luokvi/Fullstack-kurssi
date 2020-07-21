const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})

    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body
    const blog = new Blog({
      id: body.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    })
  
    const saved = await blog.save()
    res.status(200).json(saved)
  })

  module.exports = blogsRouter