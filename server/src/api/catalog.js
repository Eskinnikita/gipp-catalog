const express = require('express')
const Publication = require('../models/publication')

const router = express.Router()

router.post('/all', async (req, res) => {
  try {
    const {page, age, types} = req.body
    const limit = 2
    const options = {
      where: {},
      limit: limit,
      offset: (+page - 1) * limit,
    }
    if (types.length) {
      options.where.type = types
    }
    if (age.length) {
      options.where.age = age
    }
    const allPublications = await Publication.findAndCountAll(options).catch(
      e => {
        console.log("Error", e)
      }
    )
    res.status(200).json(allPublications)
  } catch (err) {
    res.status(500).json({message: err})
  }
})


module.exports = router
