const express = require('express')
const Publication = require('../models/publication')
const Article = require('../models/article')

const router = express.Router()

router.post('/tab-content', async (req, res) => {
  try {
    const {tab, page, role, id} = req.body
    let tabContent, limit
    if (tab === 'catalog') {
      limit = 12
      tabContent = await Publication.findAndCountAll({
        where: {publisherId: id},
        limit: limit,
        offset: (+page - 1) * limit,
        attributes: ['id', 'coverLink', 'title', 'updatedAt']
      })
      tabContent.limit = limit
    } else if (tab === 'news') {
      limit = 4
      tabContent = await Article.findAndCountAll({
        where: {authorId: id, authorRole: role},
        limit: limit,
        offset: (+page - 1) * limit,
        attributes: {exclude: ['blocks']},
        order: [['updatedAt', 'DESC']],
      })
      tabContent.limit = limit
    }
    res.status(200).json(tabContent)
  } catch (err) {
    res.status(500).json({message: err})
  }
})

// include: [
//   {
//     model: Publication,
//     key: 'publications',
//     required: false,
//     attributes: ['id', 'coverLink', 'title', 'updatedAt'],
//   },
//   {
//     model: Review,
//     include: [
//       {
//         model: Publisher,
//         attributes: ['id', 'name', 'logoUrl', 'role']
//       },
//       {
//         model: User,
//         attributes: ['id', 'name', 'role']
//       },
//       {
//         model: Organ,
//         attributes: ['id', 'name', 'role']
//       }
//     ]
//   }
// ],
//   order: [
//   [Publication, 'updatedAt', 'DESC']
// ]

module.exports = router
