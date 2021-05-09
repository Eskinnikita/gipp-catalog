const passport = require('passport')
const passportJWT = require('passport-jwt')
const extractJWT = passportJWT.ExtractJwt
const strategyJWT = passportJWT.Strategy
const User = require('../models/user')
const Publisher = require('../models/publisher')

passport.use(
  // new strategyJWT(
  //     {
  //         jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  //         secretOrKey: process.env.JWT_SECRET
  //     },
  //     (jwtPayload, done) => {
  //         return User.findOne({where: {id: jwtPayload.id}})
  //         .then((user) => {
  //             return done(null, user)
  //         })
  //         .catch((e) => {
  //             return done(e)
  //         })
  //     }
  // )
  new strategyJWT(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (jwtPayload, done) => {
      let user
      const email = jwtPayload.email
      await Promise.all([
        User.findOne({where: {id: jwtPayload.id, email}}),
        Publisher.findOne({where: {id: jwtPayload.id, email}})
      ])
        .then((data) => {
          for(let i = 0; i < data.length; i++) {
            if(data[i] !== null) {
              user = data[i].dataValues
            }
          }
          return done(null, user)
        })
        .catch((e) => {
          return done(e)
        })
    }
  )
)


