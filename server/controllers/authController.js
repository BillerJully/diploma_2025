const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY 

const generateAccessToken = (id) => {
    const payload = { 
        id
    }
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
}

class AuthController { 
    
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Ошибка валидации",
                    errors: errors.array()
                })
            }

            const { username, password } = req.body

            // Проверка на существование пользователя
            const candidate = await User.findOne({ where: { username } })
            if (candidate) {
                return res.status(400).json({ 
                    message: "Пользователь с таким именем уже существует" 
                })
            }

            // Хеширование пароля
            const hashPassword = await bcrypt.hash(password, 10) 

            // Создание пользователя
            const user = await User.create({ 
                username, 
                password: hashPassword 
            })

            // Генерация токена
            const token = generateAccessToken(user.id)

            return res.status(201).json({ // 201 для успешного создания
                message: "Пользователь успешно зарегистрирован",
                token,
                userId: user.id
            })

        } catch (error) {
            console.error("Ошибка регистрации:", error)
            return res.status(500).json({ 
                message: "Внутренняя ошибка сервера",
                error: error.message 
            })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body

            // Поиск пользователя
            const user = await User.findOne({ where: { username } })
            if (!user) {
                return res.status(401).json({ 
                    message: "Неверное имя пользователя или пароль" 
                })
            }

            // Проверка пароля
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                return res.status(401).json({ 
                    message: "Неверное имя пользователя или пароль"
                })
            }

            // Генерация токена
            const token = generateAccessToken(user.id)

            return res.json({
                message: "Успешная авторизация",
                token,
                userId: user.id,
                username: user.username
            })

        } catch (error) {
            console.error("Ошибка авторизации:", error)
            return res.status(500).json({ 
                message: "Внутренняя ошибка сервера",
                error: error.message 
            })
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params

            // Проверка, что пользователь существует
            const user = await User.findByPk(id)
            if (!user) {
                return res.status(404).json({ 
                    message: 'Пользователь не найден' 
                })
            }

            // Удаление пользователя
            await user.destroy()

            return res.json({ 
                message: 'Пользователь успешно удален',
                deletedUserId: id
            })

        } catch (error) {
            console.error("Ошибка удаления пользователя:", error)
            return res.status(500).json({ 
                message: "Не удалось удалить пользователя",
                error: error.message 
            })
        }
    }
}

module.exports = new AuthController()
