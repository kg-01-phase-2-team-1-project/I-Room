const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

async function auth(req, res, next) {
    const token = req.headers.token
    if (!token) {
        res.status(401).json({
            error: 'please login first'
        })
    } else {
        const payload = verifyToken(token)
        try {
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if (!user) {
                res.status(401).json({
                    error: 'login first'
                })
            } else {
                req.userLogin = user
                next()
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: 'internal server error'
            })
        }
    }
}

async function isAdmin(req, res, next) {
    try {
        if(req.userLogin.role !== 'admin') {
            res.status(401).json({
                message: `You don't have permission to access`
            })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

async function isCustomer(req, res, next) {
    try {
        if(req.userLogin.role !== 'customer') {
            res.status(401).json({
                message: `You don't have permission to access`
            })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

module.exports = {
    auth, isAdmin, isCustomer
}