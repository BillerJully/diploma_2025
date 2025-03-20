const {categoryProfit} = require('../models/models')


class CategoryIncome{

    async create(req, res)//Создание категории
    {
        try {
            const {name} = req.body
            const category = await categoryProfit.create({name})
            res.json(category)


        } catch (error) {
            console.error(error)   
        }
    }

    async getAll(req, res)//Получение всех категорий 
    {
        const categoryAll = await categoryProfit.findAll()
        return res.json(categoryAll)
    }

    async getOne(req, res)//Получение одной категории по ID
    {
        try {
            const {id} = req.params
            const categoryOne = await categoryProfit.findOne({where:{id}})
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
            const category = await categoryProfit.findOne({where:{id}})
            if(!category){
                res.status(404).json({meassage: "Категория не найдена"})
            }
            category.name = name
            await category.save()
            return res.json(category)
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({message:"Запрос не может быть обработан"})
        }
    }

    async deleteOne(req, res)//Удаление категории по ID
    {
        try {
            const {id} = req.params
            const category = await categoryProfit.findOne({where:{id}})
            if(!category){
                res.status(404).json({meassage:"Категория не найдена"})
            }
            await category.destroy()
            res.json(category)
        }
            
        catch (error) {
            console.error(error)
            return res.status(500).json({message:"Запрос не может быть обработан"})
        }
    }

}

module.exports = new CategoryIncome()