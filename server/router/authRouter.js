const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
router.get('/users', authController.getUsers)
router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.delete('/user/:id', authController.deleteUser)
router.get('/user/:id', authController.getOneUsers)

module.exports = router
