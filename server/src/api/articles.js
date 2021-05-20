const express = require('express')
const multer = require('multer')
const Article = require('../models/article')
const User = require('../models/user')
const Organ = require('../models/organization')
const Publisher = require('../models/publisher')

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/newsPreviews')
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

const defineModel = (role) => {
  let Model
  switch (role) {
    case 1:
      Model = User;
      break;
    case 2:
      Model = Organ;
      break;
    case 3:
      Model = Publisher;
      break;
    default:
      console.log("error")
      break;
  }
  return Model
}

router.post('/', upload.single('mainImage'), async (req, res) => {
  try {
    const parsedData = JSON.parse(req.body.data)
    if (req.file) {
      parsedData.mainImageUrl = req.file.path
    }
    const article = Article.create(parsedData)
      .catch(e => {
        res.status(404).json({message: e})
      })
    res.status(201).json(article)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const article = await Article.findOne({where: {id}})
      .catch(e => {
        res.status(404).json({message: e})
      })
    const articleCopy = JSON.parse(JSON.stringify(article))
    const authorModel = defineModel(article.authorRole)
    articleCopy.author = await authorModel.findOne(
      {
        where: {id: article.authorId},
        attributes: ['id', 'role', 'name']
      })
    res.status(200).json(articleCopy)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

module.exports = router
