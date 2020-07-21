const Blog = require('../models/blog')

const initialBlogs = [
    {
        id: "first",
        title: "First Blog",
        author: "Testi Testaaja",
        url: "https://www.google.com/",
        likes: 5
    },
    {
        id: "second",
        title: "Second Blog",
        author: "Bloggaaja",
        url: "https://www.google.com/",
        likes: 2
    },
    {
        id: "third",
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

module.exports = {
    initialBlogs, blogsInDb
}