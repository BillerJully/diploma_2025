const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const CategoryExpense = sequelize.define('category_expense', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false } 
}) 

module.exports = CategoryExpense