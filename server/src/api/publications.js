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

router.get('/:id', async (req, res) => {
  try {
    Publication.hasMany(Review)
    const id = req.params.id
    const publication = await Publication.findOne({
      where: {id},
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
          model: Publication,
          key: 'publications',
          required: false,
          attributes: ['id', 'coverLink', 'title', 'count', 'period', 'age', 'updatedAt'],
          where: {
            id: {
              [Op.ne]: id
            }
          }
        },
      ],
      order: [
        [Publication, 'updatedAt', 'DESC']
      ]
    }).catch(e => {
      console.log(e)
      res.status(404).json({message: e})
    })
    res.status(200).json(publicationCopy)
  } catch (e) {
    console.log(e)
    res.status(500).json({message: e})
  }
})

router.get('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const publication = await Publication.findOne({
      where: {id}
    }).catch(e => {
      res.status(404).json({message: e})
    })
    res.status(200).json(publication)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

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


module.exports = router
