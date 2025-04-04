const User = require('./userModels')
const CategoryExpense = require('./expenseModels')
const CategoryIncome = require('./incomeModels')
const Transaction = require('./transactionModels')

User.hasMany(CategoryExpense)
CategoryExpense.belongsTo(User)

User.hasMany(CategoryIncome)
CategoryIncome.belongsTo(User)

User.hasMany(Transaction)
Transaction.belongsTo(User)

CategoryExpense.hasMany(Transaction)
Transaction.belongsTo(CategoryExpense)

CategoryIncome.hasMany(Transaction) 
Transaction.belongsTo(CategoryIncome)

module.exports = {
    CategoryExpense, 
    CategoryIncome, 
    Transaction,
    User,
}