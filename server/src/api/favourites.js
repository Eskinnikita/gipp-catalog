const express = require('express')
const UserPublication = require('../models/userPublications')
const Publication = require('../models/publication')
const router = express.Router()


router.post('/', async (req, res) => {
  try {
    const savedPublication = await UserPublication.create(req.body)
    res.status(200).json(savedPublication)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

router.post('/all', async (req, res) => {
  try {
    UserPublication.belongsTo(Publication, {foreignKey: 'publicationId'})
    const {id, role} = req.body
    const favourites = await UserPublication.findAndCountAll({
      where: {
        userId: id,
        userRole: role
      },
      include: {
        model: Publication,
        attributes: ['id', 'title', 'coverLink'],
      }
    })
    const favouritesPublications = {}
    favouritesPublications.count = favourites.count
    favouritesPublications.publications = []
    favourites.rows.forEach(el => {
      favouritesPublications.publications.push(el.Publication)
    })

    res.status(200).json(favouritesPublications)
  } catch (e) {
    res.status(500).json({message: e})
  }
})

module.exports = router
