const express = require('express')
const Publisher = require('../models/publisher')
const Publication = require('../models/publication')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/publishersLogos')
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

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const publisher = await Publisher.findOne({
      where: {id},
      attributes: { exclude: ['password', 'approved'] },
      include: [
        {
          model: Publication,
          key: 'publications',
          required: false,
          attributes: ['id', 'coverLink', 'title'],
        },
      ]
    }).catch(e => {
      res.status(404).json({message: e})
    })
    res.status(200).json(publisher)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

router.patch('/:id', upload.single('logo'), async (req, res) => {
  try {
    const id = req.params.id
    const infoToUpdate = JSON.parse(req.body.publisher)

    if(req.body.logo !== 'null') {
      infoToUpdate.logoUrl = req.file.path
    }
    console.log(id, infoToUpdate)
    const updatedPublisher = await Publisher.update(infoToUpdate, {
      where: {
        id
      }
    }).catch(e => {
      res.status(409).json({message: e})
    })
    res.status(200).json(updatedPublisher)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

module.exports = router
