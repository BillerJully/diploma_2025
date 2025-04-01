const {DataTypes, DatabaseError} = require('sequelize')
const sequelize = require('../db')

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true, defaultValue:'USER'}
})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    username: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { notEmpty: true }},
    password: { type: DataTypes.STRING, allowNull: false, validate: { len: [6, 100] }} })

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

User.belongsToMany(Role, { through: 'user_roles' })
Role.belongsToMany(User, { through: 'user_roles' })

module.exports ={
    CategoryExpense, 
    CategoryIncome, 
    Transaction,
    Role,
    User,
}

