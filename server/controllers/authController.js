const {User, Role} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
require('dotenv').config()
secret = process.env.SECRET_KEY

const generateAccessToken = (id, user_roles) => {
    const playoad = {
        id, 
        user_roles
    }
    return jwt.sign(playoad, secret, {expiresIn: "24h"})
}

class AuthContoller{

    async registration(req, res) {
        try {

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка при регистрации: ", errors})
            }

            const{username, password} = req.body
            const user = await User.findOne({where:{username}})

            if(user){
                return res.status(400).json({message: "Пользователь уже зарегистрован"})
            }
 
            const hashPassword = bcrypt.hashSync(password, 6)
            const userRole = await Role.findOne({where:{value:'USER'}})

            const newUser = await User.create({username, password: hashPassword, user_roles: [userRole.value]})
            await newUser.addRole(userRole)
            return res.json({message:"Пользователь зарегистрован"})

        } 
        catch (error) {
            console.log("Возникла ошибка: ",error)
            res.status(401).json({message:"Ошибка, зарегистровать пользователя не удалось "})
        }
    }


    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({where:{username}})

            if(!user){
                return res.status(401).json({message:"Ошибка, пользователь не зарегистрован"})
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message:"Введен неправильный пароль"})
            }
            const token = generateAccessToken(user.id, user.user_roles)
            return res.json({token:token})
        } 
        catch (error) {
            console.log("Возникла ошибка: ",error)
            res.status(400).json({message:"Ошибка"})
        }
    }



    async deleteUser(req, res){
        try {
            const {id} = req.params
            const userDelet = await User.findOne({where:{id}})
            if(!userDelet){
                return res.status(400).json({message:'Пользователь не существует'})
            }
            await userDelet.destroy()
        res.json({message:'Пользователь удален',
            user: userDelet})
        } 
        catch (error) {
            console.log(error)
            res.status(400).json({message:'Пользователь не может быть удален'})
        }
    }

}

module.exports = new AuthContoller()