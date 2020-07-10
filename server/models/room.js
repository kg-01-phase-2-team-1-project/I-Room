'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Room.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Input your name!'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Input room type!'
        }
      }
    },
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (room) => {
        room.status = 'Unoccupied'
      }
    },
    sequelize,
    modelName: 'Room',
  });
  return Room;
};