const {DataTypes} = require('sequelize')
const sequelize = require('../db')


const CategoryExpense = sequelize.define('category_expense', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Модель категории рассходов
    name: { type: DataTypes.STRING, unique: true,allowNull: false } 
}) 

const CategoryIncome = sequelize.define('category_income', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true}, // Модель категории доходов
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Transaction = sequelize.define('transaction', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    date_transaction: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING,  allowNull: false},
    sum: {type: DataTypes.INTEGER, allowNull: false},
    categoryExpenseId: { type: DataTypes.INTEGER, allowNull: true }, 
    categoryIncomeId: { type: DataTypes.INTEGER, allowNull: true }   
})
CategoryExpense.hasMany(Transaction)
Transaction.belongsTo(CategoryExpense)

CategoryIncome.hasMany(Transaction) 
Transaction.belongsTo(CategoryIncome)

 
module.exports ={
    CategoryExpense, 
    CategoryIncome, 
    Transaction,

}

