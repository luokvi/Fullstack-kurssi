const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})

    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const blogs = await Blog.find({})
  let blog = null
  blogs.forEach(b => {
    if (b.id === id){
      blog = b
    }
  })
  if (blog === null){
    res.status(404).end()
    return
  }

  res.json(blog)
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

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const blogs = await Blog.find({})
  let blog = null
  blogs.forEach(b => {
    if (b.id === id){
      blog = b
    }
  })
  if (blog === null){
    res.status(404).end()
    return
  }
  
  await Blog.findByIdAndDelete(blog._id)

  res.status(204).end()
  })

module.exports = blogsRouter