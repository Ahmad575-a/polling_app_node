const express = require('express')
const router = express.Router()
const Pusher = require('pusher')
const pusher = new Pusher({
    appId: "1203974",
    key: "cee11e983a5b34f0291f",
    secret: "7dad4bb232088ac176f9",
    cluster: "eu",
    useTLS: true
  });

router.get('/', (req, res)=>{
    res.send('poll')
})

router.post('/', (req,res)=>{
    pusher.trigger("os-poll", "os-vote", {
        points: 1,
        os: req.body.os
      });
      
      return res.json({ success: true, message: 'Thank you for voting'})
})

module.exports = router 