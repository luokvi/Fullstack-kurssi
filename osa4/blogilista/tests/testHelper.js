const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs,
}