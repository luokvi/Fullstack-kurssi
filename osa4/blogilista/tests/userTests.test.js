const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./testHelper')

const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'kayttaja',
      name: 'Nimi Niminen',
      password: '123',
    }

    await api.post('/api/users').send(newUser).expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creating a new user with the same username ends in an error', async () => {
      const newUser = {
          username: 'root',
          passwordHash: '123'
      }

      await api.post('/api/users').send(newUser).expect(400)
  })
  
})

describe('not able to create new users with', () => {
    test('username thats less than 3 characters', async () => {
        const newUser = {
            username: 'r',
            name: 'Testi Kayttaja',
            passwordHash: '123'
        }

        await api.post('/api/users').send(newUser).expect(400)
    })

    test('password that less than 3 characters', async () => {
        const newUser = {
            username: 'testi',
            name: 'Testi Kayttaja',
            passwordHash: '1'
        }

        await api.post('/api/users').send(newUser).expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
