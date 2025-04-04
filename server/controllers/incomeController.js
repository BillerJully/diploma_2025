const { CategoryIncome } = require('../models/models')

class IncomeController {
    async create(req, res) {
        try {
            const { name } = req.body
            const userId = req.user.id 

            if (!name) {
                return res.status(400).json({ message: "Название категории обязательно" })
            }

            const category = await CategoryIncome.create({ name, userId })
            return res.status(201).json(category)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Ошибка при создании категории" })
        }
    }

    async getAll(req, res) {
        try {
            const userId = req.user.id
            const categories = await CategoryIncome.findAll({ where: { userId } })
            return res.json(categories)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Ошибка при получении категорий" })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            const userId = req.user.id

            const category = await CategoryIncome.findOne({ 
                where: { id, userId } 
            })

            if (!category) {
                return res.status(404).json({ message: "Категория не найдена" })
            }

            return res.json(category)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Ошибка при получении категории" })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { name } = req.body
            const userId = req.user.id

            if (!name) {
                return res.status(400).json({ message: "Название категории обязательно" })
            }

            const category = await CategoryIncome.findOne({ 
                where: { id, userId } 
            })

            if (!category) {
                return res.status(404).json({ message: "Категория не найдена" })
            }

            category.name = name
            await category.save()

            return res.json(category)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Ошибка при обновлении категории" })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const userId = req.user.id

            const category = await CategoryIncome.findOne({ 
                where: { id, userId } 
            })

            if (!category) {
                return res.status(404).json({ message: "Категория не найдена" })
            }

            await category.destroy()
            return res.json({ message: "Категория успешно удалена" })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Ошибка при удалении категории" })
        }
    }
}

module.exports = new IncomeController()