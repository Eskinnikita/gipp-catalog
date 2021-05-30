const express = require('express')
const sequelize = require('sequelize')
const Publication = require('../models/publication')

const router = express.Router()

router.post('/all', async (req, res) => {
  try {
    const {page, age, types, search} = req.body
    const limit = 16
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
    if (search && search !== '') {
      options.where.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + search + '%')
    }
    const allPublications = await Publication.findAndCountAll(options).catch(
      e => {
        console.log("Error", e)
      }
    )
    allPublications.limit = limit
    res.status(200).json(allPublications)
  } catch (err) {
    res.status(500).json({message: err})
  }
})


module.exports = router
