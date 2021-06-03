const express = require('express')
const Comment = require('../models/comment')
const User = require('../models/user')
const Organ = require('../models/organization')
const Publisher = require('../models/publisher')
const authorParser = require('../utils/authorParser')

const router = express.Router()

//Добавление комментария
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create(req.body).catch(e => {
      res.status(401).json({message: e.message})
    })
    let commentWithAuthor = await Comment.findOne({
      where: { id: comment.id},
      include: [
        {
          model: Publisher,
          attributes: ['id', 'name', 'logoUrl', 'role']
        },
        {
          model: User,
          attributes: ['id', 'name', 'role']
        },
        {
          model: Organ,
          attributes: ['id', 'name', 'role']
        }
      ]
    })
    const authorCopy = JSON.parse(JSON.stringify([commentWithAuthor]))
    commentWithAuthor = authorParser(authorCopy)
    console.log(commentWithAuthor)
    res.status(200).json(commentWithAuthor)
  } catch (err) {
    res.status(500).json({message: err})
  }
})

module.exports = router
