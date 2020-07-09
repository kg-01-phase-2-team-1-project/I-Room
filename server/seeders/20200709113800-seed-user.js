'use strict';
const fs = require('fs')
const { hashPass } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('user.json', 'utf8'))
    data = data.map(temp => {
      temp.password = hashPass(temp.password)
      temp.birthOfDate = new Date()
      temp.createdAt = new Date()
      temp.updatedAt = new Date()
      return temp
    })
    return queryInterface.bulkInsert('Users', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
