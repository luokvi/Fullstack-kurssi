const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

const getToken = req => {
  const auth = req.get('authorization')

  if (auth && auth.toLowerCase().startsWith('bearer ')){
    console.log(auth.substring(7))
    return auth.substring(7)
  }
  return null
}

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const token = getToken(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id){
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

  await Blog.findByIdAndDelete(blog._id)

  res.status(204).end()
  })

module.exports = blogsRouter