const express = require('express')
const passport = require('passport')
const PubTag = require('../models/pubTag')

const router = express.Router()

router.get('/pub/all', passport.authenticate("jwt", {session: false}), async (req, res) => {
  try {
    const tags = await PubTag.findAll({
      order: [['tag', 'ASC']]
    }).catch(
      e => {
        console.log("Error", e)
      }
    )
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json({message: err})
  }
})


module.exports = router
