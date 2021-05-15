const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

// DB config
require('./config/db')

const app = express()
const poll = require('./routes/poll')
// setting public folder
app.use(express.static(path.join(__dirname, 'public')))

// body parser middleware 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// enable cors
app.use(cors())

app.use('/poll', poll)

const PORT = 3000

// starting the server 
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))