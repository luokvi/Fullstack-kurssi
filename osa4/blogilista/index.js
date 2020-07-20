const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blogs')


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})