const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Transaction = sequelize.define('transaction', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    date_transaction: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    sum: {type: DataTypes.INTEGER, allowNull: false},
    categoryExpenseId: { type: DataTypes.INTEGER, allowNull: true }, 
    categoryIncomeId: { type: DataTypes.INTEGER, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: false }   
})

module.exports = Transaction