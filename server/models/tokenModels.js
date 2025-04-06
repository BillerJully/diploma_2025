const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const TokenModel = sequelize.define('token_model', {
  
    tokenName: {type: DataTypes.STRING, unique: true, allowNull: false},
    userId: { type: DataTypes.INTEGER, allowNull: false }

})

module.exports = TokenModel