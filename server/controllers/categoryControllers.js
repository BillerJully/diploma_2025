const {CategoryCost} = require('../models/models')

class CategoryController{

    async create(req, res)//Создание категории
    {
        const {name} = req.body
        const category = await CategoryCost.create({name})
        res.json(category)
    }

    async getAll(req, res)//Получение всех категорий
    {
        const categoryAll = await CategoryCost.findAll()
        return res.json(categoryAll)
    }

    async getOne(req, res)//Получение одной категории по ID
    {
        try {
            const {id} = req.params
            const categoryOne = await CategoryCost.findOne({where:{id}})
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
    
            const categoryCost = await CategoryCost.findOne({where: {id}})
            if(!categoryCost){
                return res.status(404).json({message:'Категория не найдена'})
            }
    
            categoryCost.name = name
            await categoryCost.save()
            res.json(categoryCost)
            
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({message:'Ошибка при изменении категории'})
        }
    }

    async deleteCost(req, res)//Удаление категории по ID
    {

        try {
            const {id} = req.params
            const categoryCost = await CategoryCost.findOne({where: {id}})

            if(!categoryCost){
                return res.status(404).json({message: "Категория не найдена"});    
            }

            await categoryCost.destroy()
            return res.status(200).json({message:"Категория успешно удалена"})
            
        } catch (error) {
            console.error(error)
            res.status(500).json({message: 'Ошибка при удалении'})
        }
    

    }
}

module.exports = new CategoryController()