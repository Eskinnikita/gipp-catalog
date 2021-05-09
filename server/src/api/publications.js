const express = require('express')
const multer = require('multer')
const passport = require('passport')
const Publication = require('../models/publication')

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
    parsedPublication.coverLink = req.file.path
    console.log(parsedPublication)
    const newPublication = await Publication.create(parsedPublication)
      .catch(e => {
        res.status(409).json({message: e})
      })
    res.status(200).json(newPublication)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

module.exports = router
