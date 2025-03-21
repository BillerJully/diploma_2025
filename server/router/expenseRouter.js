const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expenseControllers')

router.post('/', expenseController.create)
router.get('/', expenseController.getAll)
router.put('/:id', expenseController.upDate)
router.delete('/:id', expenseController.deleteOne)
router.get('/:id', expenseController.getOne)

module.exports = router

//expense