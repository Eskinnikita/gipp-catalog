const express = require('express')
const User = require('../models/user')
const Publisher = require('../models/publisher')
const Organ = require('../models/organization')
const passport = require('passport')

const router = express.Router()

router.get('/users/all/:role', passport.authenticate('jwt', { session: false }) ,async (req, res) => {
  try {
    const role = +req.params.role
    let Model
    switch(role) {
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
        console.log("Error")
        break;
    }
    const users = await Model.findAll({where: {role}, attributes: { exclude: ['password'] }}).catch(
      e => {
        console.log("Error", e)
      }
    )
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({message: err})
  }
})

module.exports = router
