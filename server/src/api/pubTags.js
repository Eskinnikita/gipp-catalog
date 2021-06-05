const express = require('express')
const passport = require('passport')
const PubTag = require('../models/pubTag')

const router = express.Router()

router.get('/pub/all', async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    const existedTag = await PubTag.findOne({where: {tag: req.body.tag}})
    if(existedTag) {
      res.status(409).json({message: 'Тег уже существует!'})
    } else {
      const tag = await PubTag.create(req.body).catch(
        e => {
          console.log("Error", e)
        }
      )
      res.status(200).json(tag)
    }
  } catch (err) {
    res.status(500).json({message: err})
  }
})


module.exports = router
