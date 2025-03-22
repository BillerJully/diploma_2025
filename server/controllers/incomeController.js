const {CategoryIncome} = require('../models/models')


class IncomeController{

    async create(req, res)//Создание категории
    {
        try {
            const {name} = req.body
            const category = await CategoryIncome.create({name})
            res.json(category)


        } catch (error) {
            console.error(error)   
        }
    }

    async getAll(req, res)//Получение всех категорий 
    {
        const categoryAll = await CategoryIncome.findAll()
        return res.json(categoryAll)
    }

    async getOne(req, res)//Получение одной категории по ID
    {
        try {
            const {id} = req.params
            const categoryOne = await CategoryIncome.findOne({where:{id}})
            if(!categoryOne){
                res.status(404).json({meassage:"Категория не найдена"})
            }
            return res.json(categoryOne)
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({message:"Запрос не может быть обработан"})
        }
    }

    async upDate(req, res)//Обновления названия в категории
    {
        try {
            const{name} = req.body
            const {id} = req.params
            const categoryUp = await CategoryIncome.findOne({where:{id}})
            if(!categoryUp){
                res.status(404).json({meassage: "Категория не найдена"})
            }
            categoryUp.name = name
            await categoryUp.save()
            return res.json(categoryUp)
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({message:"Запрос не может быть обработан"})
        }
    }

    async deleteOne(req, res)//Удаление категории по ID
    {
        try {
            const {id} = req.params
            const categoryDelete = await CategoryIncome.findOne({where:{id}})
            if(!categoryDelete){
                res.status(404).json({meassage:"Категория не найдена"})
            }
            await categoryDelete.destroy()
            res.json(categoryDelete)
        }
            
        catch (error) {
            console.error(error)
            return res.status(500).json({message:"Запрос не может быть обработан"})
        }
    }

}

module.exports = new IncomeController() //экспорт класса дохода