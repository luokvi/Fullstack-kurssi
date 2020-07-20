const { MongooseDocument } = require('mongoose')

require('dotenv').config()

let MONGO_URL = process.env.MONGODB_URI
let PORT = 3003

module.exports = { MONGO_URL, PORT }