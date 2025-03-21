const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/expenditureControllers')

router.post('/', categoryController.create)
router.get('/', categoryController.getAll)
router.put('/:id', categoryController.upDate)
router.delete('/:id', categoryController.deleteCost)
router.get('/:id', categoryController.getOne)

module.exports = router