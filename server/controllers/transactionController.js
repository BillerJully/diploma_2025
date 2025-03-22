const moment = require('moment')
const {Transaction} = require('../models/models')
const { CategoryExpense } = require('../models/models');
const { CategoryIncome } = require('../models/models');

class TransactionController{

    async getOne(req, res) {
        try {
            const {id} = req.params
            const categoryOne = await Transaction.findOne({where: {id}})
            return res.json(categoryOne)
            
        } catch (error) {
            console.error(error) 
        }
    }

    async create(req, res) {
        try {
            const {date_transaction, name,  sum, categoryExpenseId, categoryIncomeId} = req.body
        // Проверка на существовании категории по Id
        if (categoryExpenseId) {
            const categoryExpense = await CategoryExpense.findByPk(categoryExpenseId);
            if (!categoryExpense) {
                return res.status(400).json({ message: "Категория расходов не найдена" });
            }
        }

        // Проверка на существовании категории по Id
        if (categoryIncomeId) {
            const categoryIncome = await CategoryIncome.findByPk(categoryIncomeId);
            if (!categoryIncome) {
                return res.status(400).json({ message: "Категория доходов не найдена" });
            }
        }

            //const formattedDate = moment(date_transaction, 'DD-MM-YYYY').format('YYYY-MM-DD');
            const category = await Transaction.create({date_transaction, name,sum, categoryExpenseId, categoryIncomeId})
            res.json(category)
        } catch (error) {
           console.error(error) 
        }
    }

    async getAll(req, res) {
        try 
        {
            const categoryAll = await Transaction.findAll()
            return res.json(categoryAll)

        } catch (error) {
            console.error(error)
        }
    }

    async deleteOne(req, res) {
        try {
            const{id} = req.params
            const categoryDelete = await Transaction.findOne({where:{id}})
            if(!categoryDelete){
                res.status(404).json({meassage:"Транзакция не найдена"})
            }
            await categoryDelete.destroy()
            res.json(categoryDelete)
        } catch (error) {
            console.error(error)
        }

    }

    async upDateOne(req, res) {
        try {
            const {id} = req.params
            const {name} = req.body
            const categoryUp = await Transaction.findOne({where:{id}})
            if(!categoryUp){
                return res.status(404).json({meassage: "Транзакция не найдена"})
            }
            categoryUp.name = name
            await categoryUp.save()
            res.json(categoryUp)
            
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new TransactionController()