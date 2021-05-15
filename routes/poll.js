const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Vote = require('../models/Vote')


const Pusher = require('pusher')
const pusher = new Pusher({
    appId: "1203974",
    key: "cee11e983a5b34f0291f",
    secret: "7dad4bb232088ac176f9",
    cluster: "eu",
    useTLS: true
  });

router.get('/', (req, res)=>{
    Vote.find().then(votes=> res.json({success: true, votes: votes}))
})

router.post('/', (req,res)=>{
    const newVote ={
        os: req.body.os,
        points: 1
    }
    new Vote(newVote).save().then(vote=>{
        pusher.trigger("os-poll", "os-vote", {
        points: parseInt(vote.points),
        os: vote.os
      });
      
      return res.json({ success: true, message: 'Thank you for voting'})
    })

    
})

module.exports = router 