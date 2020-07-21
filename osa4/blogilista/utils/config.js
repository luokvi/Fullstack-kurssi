const { MongooseDocument } = require('mongoose')

require('dotenv').config()

let MONGO_URL = process.env.MONGODB_URI

if(process.env.NODE_ENV === "test"){
    MONGO_URL = process.env.MONGODB_URI_TEST
}

let PORT = 3003

module.exports = { MONGO_URL, PORT }