const express = require('express')
const User = require('../models/user')
const Publisher = require('../models/publisher')
const Organ = require('../models/organization')
const passport = require('passport')
const generator = require('generate-password');
const transporter = require('../utils/nodemailerClient')


const router = express.Router()

router.get('/users/all/:role', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const role = +req.params.role
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
        console.log("Error")
        break;
    }
    const users = await Model.findAll({where: {role}, attributes: {exclude: ['password']}}).catch(
      e => {
        console.log("Error", e)
      }
    )
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({message: err})
  }
})

router.post('/users/confirm', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    console.log('TYE', req.body)
    const {role, id} = req.body
    let Model
    switch (role) {
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
    const newPassword = generator.generate({
      length: 10,
      numbers: true
    });

    await Model.update({approved: true, password: newPassword}, {
      where: {
        id
      }
    });

    const request = await Model.findOne({where: {id}})
    const email = request.dataValues.email

    const info = await transporter.sendMail({
      from: process.env.MAIL_CLIENT_USERNAME, // sender address
      to: email, // list of receivers
      subject: "Добро пожаловать в детский каталог ГИПП!", // Subject line
      text: "Ваша заявка подтверждена, в можете авторизоваться на сайте, спользуя следующие данные:", // plain text body
      html: `<b>Логин: </b>${email}<br/><b>Пароль: </b>${newPassword}`, // html body
    }).catch(e => {
      console.log(e)
    })

    res.status(200).send(request)
  } catch (e) {
    res.status(500).json({message: err})
  }
})

module.exports = router
