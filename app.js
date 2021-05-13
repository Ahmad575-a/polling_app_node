const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

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

const PORT = 5000

// starting the server 
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))