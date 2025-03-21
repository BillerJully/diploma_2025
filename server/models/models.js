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

module.exports ={
    CategoryExpense, 
    CategoryIncome, 

}

//стиль написания