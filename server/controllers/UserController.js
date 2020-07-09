const { User } = require('../models/index')

const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { verify } = require('../helpers/googleOauth')

class UserController {
    static async login(req, res, next) {
        const inputPass = req.body.password
        const email = req.body.email
        try {
            const user = await User.findOne({where: { email: email }})
            const dbPass = user ? user.password: ''
            if (!user) {
                next({
                    name: 'ValidationError',
                    errors: 'invalid email/password'
                })
            } else if (!comparePass(inputPass, dbPass)) {
                next({
                    name: 'ValidationError',
                    errors: 'invalid email/password'
                })
            } else {
                const payload = {
                    email: user.email
                }
                const token = signToken(payload)
                res.status(200).json({
                    token,
                    role: user.role
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthOfDate: req.body.birthOfDate
        }
        try {
            const user = await User.create(newUser)
            const payload = {
                email: user.email
            }
            const token = signToken(payload)
            res.status(201).json({
                token
            })
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                next({
                    name: "ValidationError",
                    errors: err.errors[0].message
                })
            } else {
                next(err)
            }
        }
    }

    static async oauthGoogle(req, res) {
        const google_token = req.headers.google_token
        
        try {
            const payload = await verify(google_token)
            const newPayload = {
                email: payload.email
            }
            const user = await User.findOne({ where: { email: payload.email } })
            if (!user) {
                const newUser = {
                    email: payload.email,
                    password: process.env.DEFAULT_GOOGLEPASS,
                    firstname: payload.given_name,
                    lastname: payload.family_name,
                    birthOfDate: new Date()
                }
                const createUser = await User.create(newUser)
                const token = signToken(newPayload)
                res.status(201).json({
                    token
                })
            } else {
                const token = signToken(newPayload)
                res.status(200).json({
                    token
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = UserController