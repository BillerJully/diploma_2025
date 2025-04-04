const express = require('express')
const router = express.Router()
const incomeController = require('../controllers/incomeController')

router.get('/', incomeController.getAll)
router.get('/:id', incomeController.getOne)
router.post('/', incomeController.create)
router.put('/:id', incomeController.update)
router.delete('/:id', incomeController.delete)
module.exports = router
