const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const CategoryIncome = sequelize.define('category_income', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    userId: { type: DataTypes.INTEGER, allowNull: false }
})

module.exports = CategoryIncome