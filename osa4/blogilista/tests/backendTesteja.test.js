const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { response } = require('../app')
const helper = require('./testHelper')
const Blog = require('../models/blog')

beforeEach (async () => {
    await Blog.deleteMany()

    await Blog.insertMany(helper.initialBlogs)
})


test('correct count of blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have a column named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('blogs are added correctly', async () => {
    const blogToAdd = {id: "added",
    title:"Not a Blog", author:"George R R Martin",
    url:"https://georgerrmartin.com/notablog/", likes:5}

    await api.post('/api/blogs').send(blogToAdd)
    .expect(200).expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAfter.map(b => b.title)
    expect(contents).toContain(
      'Not a Blog'
    )

})

test('blog with no defined likes is saved with 0 likes', async () => {
    const blogToAdd = {id: "added",
    title:"Not a Blog", author:"George R R Martin",
    url:"https://georgerrmartin.com/notablog/"}

    await api.post('/api/blogs').send(blogToAdd)
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
    const likes = blogsAfter.map(b => b.likes)
    expect(likes).toContain(0)
})

test('addind a blog with no title and no url returns error', async () => {
    const blogToAdd = {id: "added", author:"George R R Martin", likes: 2}
    await api.post('/api/blogs').send(blogToAdd)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})