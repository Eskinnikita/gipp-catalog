const express = require('express')
const multer = require('multer')
const Article = require('../models/article')
const User = require('../models/user')
const Organ = require('../models/organization')
const Publisher = require('../models/publisher')
const sequelize = require('sequelize')

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

router.post('/all', async (req, res) => {
  try {
    const {page, search} = req.body
    const limit = 10
    const options = {
      where: {},
      attributes: {exclude: ['blocks']},
      order: [['updatedAt', 'DESC']],
      limit: limit,
      offset: (+page - 1) * limit,
      include: [
        {
          model: Publisher, attributes: ['id', 'name', 'logoUrl', 'role'],
        },
        {
          model: User, attributes: ['id', 'name', 'role'],
        },
        {
          model: Organ, attributes: ['id', 'name', 'role'],
        }
      ]
    }
    if (search && search !== '') {
      options.where.title = sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + search + '%')
    }
    const allArticles = await Article.findAndCountAll(options).catch(
      e => {
        console.log("Error", e)
      }
    )
    const allArticlesCopy = JSON.parse(JSON.stringify(allArticles))
    const roles = ['User', 'Publisher', 'Organ']
    allArticlesCopy.rows.forEach(el => {
      roles.forEach(role => {
        if (el[role] !== null) {
          if (el.hasOwnProperty(role) && el[role] && el[role].role === el.authorRole) {
            el.author = el[role]
            delete el[role]
          }
          delete el[role]
        }
      })
    })
    allArticlesCopy.limit = limit
    res.status(200).json(allArticlesCopy)
  } catch (err) {
    res.status(500).json({message: err})
  }
})

router.patch('/:id', upload.single('mainImage'), async (req, res) => {
  try {
    const id = req.params.id
    const parsedData = JSON.parse(req.body.data)
    if (req.file) {
      parsedData.mainImageUrl = req.file.path
    }
    const updatedArticle = await Article.update(parsedData, {
      where: {
        id
      }
    })
      .catch(e => {
        res.status(404).json({message: e})
      })
    res.status(201).json(updatedArticle)
  } catch (e) {
    res.status(500).json({message: e})
  }
})


module.exports = router
