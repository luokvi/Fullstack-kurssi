const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { json } = require('express')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    res.json(blogs.map( b => b.toJSON() ))
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

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({ error: 'invalid token'})
  }
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user.id
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

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  const userId = decodedToken.id

  if(userId.toString() === blog.user.toString()){
    await Blog.findByIdAndDelete(blog._id)
    res.status(204).end()
    return
  }

  res.status(401).end()

  })

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  const updatedBlog = new Blog({
    _id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    user: body.user.id,
    likes: body.likes
  })

  const updated = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
  res.status(200).json(updatedBlog)
})

module.exports = blogsRouter