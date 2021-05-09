const express = require('express')
const Publisher = require('../models/publisher')

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {

    res.status(200).json()
  } catch (e) {
    res.status(500).json({message: e})
  }
})


module.exports = router
