/* eslint-disable no-undef */
const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./src/auth.cjs')
const user = require('./src/user.cjs')
const content = require('./src/content.cjs')
const ugc = require('./src/ugc.cjs')

const app = express()
const port = 3000

// middleware to parse JSON data
app.use(bodyParser.json())

// configure accept headers
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS, PATCH'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, test, authorized'
  )
  next()
})

// APIs
auth(app)
user(app)
content(app)
ugc(app)

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}   ( ͡° ͜ʖ ͡°)`)
})
