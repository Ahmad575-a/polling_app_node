const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VoteSchema = new Schema ({
    os:{
        type: String,
        requierd : true
    },
    points: {
        type: String,
        requierd : true
    }
})

// create collection and add schema

const Vote = mongoose.model('Vote', VoteSchema)

module.exports = Vote