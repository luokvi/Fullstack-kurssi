const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')


app.use(cors())
app.use(express.json())

app.use(middleware.tokenExctractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing-router')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandling)

module.exports = app