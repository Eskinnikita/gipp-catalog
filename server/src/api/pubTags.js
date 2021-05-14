const express = require('express')
const pubTag = require('../models/pubTag')

const router = express.Router()

router.get('/pub/all', async (req, res) => {
  try {
    const tags = await pubTag.findAll().catch(
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
