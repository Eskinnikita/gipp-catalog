const express = require('express')
const Publication = require('../models/publication')

const router = express.Router()

router.get('/all', async (req, res) => {
  try {
    const allPublications = await Publication.findAll().catch(
      e => {
        console.log("Error", e)
      }
    )
    res.status(200).json(allPublications)
  } catch (err) {
    res.status(500).json({message: err})
  }
})


module.exports = router
