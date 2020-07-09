const bcrypt = require('bcryptjs')

function hashPass(password) {
    const salt = bcrypt.genSaltSync(5)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePass(inputPass, dbPass) {
    return bcrypt.compareSync(inputPass, dbPass)
}

module.exports = {
    hashPass, comparePass
}