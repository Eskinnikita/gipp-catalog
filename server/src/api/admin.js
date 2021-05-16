const express = require('express')
const sequelize = require('sequelize')
const Publication = require('../models/publication')
const User = require('../models/user')
const Organ = require('../models/organization')
const Review = require('../models/review')
const Publisher = require('../models/Publisher')

const router = express.Router()

const defineModel = (role) => {
  let Model
  switch (role) {
    case 1:
      Model = User;
      break;
    case 2:
      Model = Organ;
      break;
    case 3:
      Model = Publisher;
      break;
    default:
      console.log("error")
      break;
  }
  return Model
}

router.post('/users/pubs/all', async (req, res) => {
  try {
    const {page, role, search} = req.body
    const Model = defineModel(+role)
    const limit = 10
    const options = {
      where: {
        approved: true
      },
      limit: limit,
      offset: (+page - 1) * limit,
    }

    if(search && search !== '') {
      options.where.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + search + '%')
    }

    const approvedUsers = await Model.findAndCountAll(options).catch(
      e => {
        console.log("Error", e)
      }
    )
    const notApprovedUsers = await Model.findAll({where:{approved: false}}).catch(
      e => {
        console.log("Error", e)
      }
    )

    res.status(200).json({approved: approvedUsers, notApproved: notApprovedUsers, count: approvedUsers.count})
  } catch (err) {
    res.status(500).json({message: err})
  }
})

router.post('/users/users/all', async (req, res) => {
  try {
    console.log(req.body)
    const {page, search} = req.body

    const limit = 10
    const options = {
      where: {},
      limit: limit,
      offset: (+page - 1) * limit,
    }
    if(search && search !== '') {
      options.where.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + search + '%')
    }

    const users = await User.findAndCountAll(options).catch(
      e => {
        console.log("Error", e)
      }
    )
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({message: err})
  }
})

router.post('/reviews/all', async (req, res) => {
  try {
    const {page} = req.body
    const limit = 10
    const options = {
      where: {
        approved: false
      },
      limit: limit,
      offset: (+page - 1) * limit,
      include: [
        {model: Publisher, attributes: ['id', 'name', 'logoUrl', 'role']},
        {model: User, attributes: ['id','name', 'role']}
      ]
    }

    const reviews = await Review.findAndCountAll(options).catch(
      e => {
        console.log("Error", e)
      }
    )

    res.status(200).json(reviews)
  } catch (err) {
    res.status(500).json({message: err})
  }
})


module.exports = router
