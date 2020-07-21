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
    console.log(response.body[0])
    expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})