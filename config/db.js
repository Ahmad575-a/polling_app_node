const mongoose = require('mongoose')
mongoose.Promise = global.Promise


mongoose.connect('mongodb+srv://admin:admin@cluster0.fcrdg.mongodb.net/firstDB')
.then(()=> console.log('MongoDB connected ..'))
.catch(err=>console.log(err))