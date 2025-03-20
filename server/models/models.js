const {DataTypes} = require('sequelize')
const sequelize = require('../db')


const CategoryCost = sequelize.define('category_cost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true,allowNull: false } 
})

const categoryProfit = sequelize.define('categoryProfit', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

module.exports ={
    CategoryCost, 
    categoryProfit, 

}