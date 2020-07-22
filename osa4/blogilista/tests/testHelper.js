const Blog = require('../models/blog')
const User = require('../models/user')
const { use } = require('../app')

const initialBlogs = [
    {
        title: "First Blog",
        author: "Testi Testaaja",
        url: "https://www.google.com/",
        likes: 5
    },
    {
        title: "Second Blog",
        author: "Bloggaaja",
        url: "https://www.google.com/",
        likes: 2
    },
    {
        title: "Third Blog",
        author: "Testi Testaaja",
        url: "https://www.google.com/",
        likes: 1
    }

]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}