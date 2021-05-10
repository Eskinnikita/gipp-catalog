const express = require('express')
const Publisher = require('../models/publisher')
const Publication = require('../models/publication')

const router = express.Router()

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


module.exports = router
