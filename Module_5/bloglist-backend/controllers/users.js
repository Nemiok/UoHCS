const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    return response.status(400).send({ error: 'password must have length more than 3 characters' })
  }

  console.log(body.username, body.password)
  const existingUser = await User.findOne({ username: body.username })
  console.log(existingUser)
  if (existingUser) {
    return response.status(400).send({
      error: 'username must be unique'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogs: [
    ]
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter