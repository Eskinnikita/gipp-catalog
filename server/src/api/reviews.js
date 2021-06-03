const express = require('express')
const Review = require('../models/review')

const router = express.Router()

//Добавление отзыва
router.post('/', async (req, res) => {
  try {
    const review = Review.create(req.body).catch(e => {
      res.status(401).json({message: e.message})
    })
    res.status(200).json(review)
  } catch (err) {
    res.status(500).json({message: err})
  }
})


module.exports = router
