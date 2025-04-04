const { Transaction, CategoryExpense, CategoryIncome } = require('../models/models');

class TransactionController {
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const transaction = await Transaction.findOne({ where: { id } });
            
            if (!transaction) {
                return res.status(404).json({ message: "Транзакция не найдена" });
            }
            
            return res.json(transaction);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async create(req, res) {
        try {
            const { date_transaction, name, sum, categoryExpenseId, categoryIncomeId } = req.body;
            const userId = req.user.id; 

            // Проверка на существование категории расходов
            if (categoryExpenseId) {
                const categoryExpense = await CategoryExpense.findOne({ 
                    where: { id: categoryExpenseId, userId } 
                });
                if (!categoryExpense) {
                    return res.status(400).json({ message: "Категория расходов не найдена" });
                }
            }

            // Проверка на существование категории доходов
            if (categoryIncomeId) {
                const categoryIncome = await CategoryIncome.findOne({ 
                    where: { id: categoryIncomeId, userId } 
                });
                if (!categoryIncome) {
                    return res.status(400).json({ message: "Категория доходов не найдена" });
                }
            }

            const transaction = await Transaction.create({ 
                date_transaction, 
                name, 
                sum, 
                categoryExpenseId, 
                categoryIncomeId,
                userId })

            return res.json(transaction);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при создании транзакции" });
        }
    }

    async getAll(req, res) {
        try {
            const userId = req.user.id; // Получаем userId из токена
            const transactions = await Transaction.findAll({ 
                where: { userId } 
            });
            return res.json(transactions);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const transaction = await Transaction.findOne({ 
                where: { id, userId } 
            });

            if (!transaction) {
                return res.status(404).json({ message: "Транзакция не найдена" });
            }

            await transaction.destroy();
            return res.json({ message: "Транзакция удалена" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async updateOne(req, res) {
        try {
            const { id } = req.params;
            const { name, sum, date_transaction } = req.body;
            const userId = req.user.id;

            const transaction = await Transaction.findOne({ 
                where: { id, userId } 
            });

            if (!transaction) {
                return res.status(404).json({ message: "Транзакция не найдена" });
            }

            transaction.name = name || transaction.name;
            transaction.sum = sum || transaction.sum;
            transaction.date_transaction = date_transaction || transaction.date_transaction;

            await transaction.save();
            return res.json(transaction);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }
}

module.exports = new TransactionController();