const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expenseControllers')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/',authMiddleware , expenseController.create)
router.get('/',authMiddleware , expenseController.getAll)
router.put('/:id',authMiddleware , expenseController.update)
router.delete('/:id',authMiddleware , expenseController.delete)
router.get('/:id',authMiddleware , expenseController.getOne)

module.exports = router

//expense