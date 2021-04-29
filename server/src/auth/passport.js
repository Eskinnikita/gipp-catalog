const passport = require('passport')
const passportJWT = require('passport-jwt')
const extractJWT = passportJWT.ExtractJwt
const strategyJWT = passportJWT.Strategy
const User = require('../models/user')

passport.use(
    new strategyJWT(
        {
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        (jwtPayload, done) => {
            return User.findOne({where: {id: jwtPayload.id}})
            .then((user) => {
                return done(null, user)
            })
            .catch((e) => {
                return done(e)
            })
        }
    )
)


