const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('dotenv').config()

mongoose.connect(process.env.DB_URL)
.then(()=> console.log('MongoDB connected ..'))
.catch(err=>console.log(err))