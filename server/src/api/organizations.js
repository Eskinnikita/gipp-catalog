const express = require('express')
const Organ = require('../models/organization')

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await Organ.findOne({where: {id}})
    res.status(200).json(user)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

module.exports = router
