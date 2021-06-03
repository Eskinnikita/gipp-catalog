const express = require('express')
const multer = require('multer')
const passport = require('passport')
const {Op} = require("sequelize");
const Publication = require('../models/publication')
const Publisher = require('../models/publisher')
const User = require('../models/user')
const PubTag = require('../models/pubTag')
const Review = require('../models/review')
const Organ = require('../models/organization')
const Article = require('../models/article')
const UserPublications = require('../models/userPublications')
const PublisherConfig = require('../models/publisherConfig')


const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/covers')
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

//Добавление издания
router.post('/create', upload.single('cover'), async (req, res) => {
  try {
    const parsedPublication = JSON.parse(req.body.publication)
    if (req.file) {
      parsedPublication.coverLink = req.file.path
    }
    const newPublication = await Publication.create(
      parsedPublication
    )
      .catch(e => {
        res.status(409).json({message: e})
      })
    res.status(200).json(newPublication)
  } catch (e) {
    console.log(e)
    res.status(500).json({message: e})
  }
})

//Получение издания
router.post('/', async (req, res) => {
  try {
    const {publicationId, userId} = req.body
    Publication.hasMany(Review)
    Publisher.hasOne(PublisherConfig)
    const publication = await Publication.findOne({
      where: {id: +publicationId},
      include: [
        {
          model: Review,
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
        }
      ]
    }).catch(e => {
      res.status(404).json({message: e})
    })
    const publicationCopy = JSON.parse(JSON.stringify(publication))
    publicationCopy.publisher = await Publisher.findOne({
      where: {id: publication.publisherId},
      attributes: ['id', 'name'],
      include: [
        {
          model: PublisherConfig
        },
        {
          model: Publication,
          key: 'publications',
          required: false,
          attributes: ['id', 'coverLink', 'title', 'count', 'period', 'age', 'updatedAt'],
          where: {
            id: {
              [Op.ne]: publicationId
            }
          }
        }
      ],
      order: [
        [Publication, 'updatedAt', 'DESC']
      ]
    })
      .catch(e => {
        console.log(e)
        res.status(404).json({message: e})
      })
    const isFavourite = await UserPublications.findOne({where: req.body})
      .catch(e => {
        console.log(e)
        res.status(404).json({message: e})
      })
    publicationCopy.favourite = !!isFavourite
    res.status(200).json(publicationCopy)
  } catch (e) {
    console.log(e)
    res.status(500).json({message: e})
  }
})

//Получение издания для обновления
router.get('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const publication = await Publication.findOne({
      where: {id}
    }).catch(e => {
      res.status(404).json({message: e})
    })
    console.log(publication)
    res.status(200).json(publication)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

//Обновление издания
router.patch('/:id', upload.single('cover'), async (req, res) => {
  try {
    const id = req.params.id
    const infoToUpdate = JSON.parse(req.body.publication)

    if (req.file) {
      infoToUpdate.coverLink = req.file.path
    }

    const updatedPublication = await Publication.update(infoToUpdate, {
      where: {
        id
      }
    }).catch(e => {
      res.status(409).json({message: e})
    })
    res.status(200).json(updatedPublication)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

//Получение данных для главной страницы
router.get('/main-page', async (req, res) => {
  try {
    const mainPageData = {}
    const articles = await Article.findAll({
      limit: 9,
      order: [['updatedAt', 'DESC']],
      attributes: {exclude: ['blocks']}
    })
    const publications = await Publication.findAll({
      limit: 11,
      order: [['updatedAt', 'DESC']],
      attributes: ['id', 'coverLink', 'title', 'age', 'count', 'period']
    })
    mainPageData.mainNews = articles.slice(0,4)
    mainPageData.sideNews = articles.splice(4, articles.length - 1)
    mainPageData.freshPubs = publications.slice(0,3)
    mainPageData.pubsList = publications.slice(3, publications.length)
    res.status(200).json(mainPageData)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

module.exports = router
