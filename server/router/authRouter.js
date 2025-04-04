const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.delete('/user/:id', authController.deleteUser)


module.exports = router
