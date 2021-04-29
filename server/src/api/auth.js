const express = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    const userWithEmail = await User.findOne({ where: {email}}).catch(
        e => {
            console.log("Error: ", e)
        }
    )

    if(!userWithEmail) {
        return res.status(400).json({
            message: "Неверная почта или пароль!"
        })
    }

    if(userWithEmail.password != password) {
        return res.status(400).json({
            message: "Неверная почта или пароль!"
        })
    }

    const jwtToken = jwt.sign(
        {id: userWithEmail.id, email: userWithEmail.email},
        process.env.JWT_SECRET
    )

    const userWithToken = JSON.parse(JSON.stringify(userWithEmail))
    userWithToken.token = jwtToken

    res.status(200).json(userWithToken)
})

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body

    const existedUser = await User.findOne({where: {email}}).catch(
        e => {
            console.log("Error", e)
        }
    )

    if(existedUser) {
        res.status(409).json({
            message: "Пользователь уже существует!"
        })
    }

    const newUser = new User({name, email, password})
    const createdUser = await newUser.save().catch(
        e => {
            console.log("Error: ", e);
            res.status(500).json({ error: "Ошибка регистрации" });
        }
    )

    if(createdUser) {
        res.json(createdUser)
    }
})

module.exports = router