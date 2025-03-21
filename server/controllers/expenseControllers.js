const {CategoryExpense} = require('../models/models')

class ExpenseController{

    async create(req, res)//Создание категории
    {
        const {name} = req.body
        const category = await CategoryExpense.create({name})
        res.json(category)
    }

    async getAll(req, res)//Получение всех категорий
    {
        const categoryAll = await CategoryExpense.findAll()
        return res.json(categoryAll)
    }

    async getOne(req, res)//Получение одной категории по ID
    {
        try {
            const {id} = req.params
            const categoryOne = await CategoryExpense.findOne({where:{id}})
            if(!categoryOne){
                return res.status(404).json({message: `Категория с данным:${id} не существует`})
            }
            return res.json({
                message: "Категория найдена",
                category: categoryOne,
            })
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Запрос не может быть обработан"})
        }
    }


    async upDate(req,res)//Обновления названия в категории
    {
        try {
            const { id } = req.params
            const { name } = req.body
    
            const categoryUP = await CategoryExpense.findOne({where: {id}})
            if(!categoryUP){
                return res.status(404).json({message:'Категория не найдена'})
            }
    
            categoryUP.name = name
            await categoryUP.save()
            res.json(categoryUP)
            
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({message:'Ошибка при изменении категории'})
        }
    }

    async deleteOne(req, res)//Удаление категории по ID
    {

        try {
            const {id} = req.params
            const categoryDelete = await CategoryExpense.findOne({where: {id}})

            if(!categoryCost){
                return res.status(404).json({message: "Категория не найдена"});    
            }

            await categoryDelete.destroy()
            return res.status(200).json({message:"Категория успешно удалена"})
            
        } catch (error) {
            console.error(error)
            res.status(500).json({message: 'Ошибка при удалении'})
        }
    

    }
}

module.exports = new ExpenseController() //экспорт класса расхода