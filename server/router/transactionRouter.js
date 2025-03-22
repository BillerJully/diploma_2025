const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')

router.get('/:id', transactionController.getOne)
router.post('/', transactionController.create)
router.get('/', transactionController.getAll)
router.delete('/:id', transactionController.deleteOne)
router.put('/:id', transactionController.upDateOne)

module.exports = router