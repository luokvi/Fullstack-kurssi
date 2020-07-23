const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })

    res.json(users.map( u => u.toJSON() ))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.password === undefined){
      res.status(400).json({ error: "password is required" })
      return
  }
  if (body.password.length < 3){
      res.status(400).json({ error: "password must be atleast 3 characters"})
      return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = usersRouter