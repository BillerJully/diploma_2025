const express = require('express')
const router = express.Router()

const categoryRouter = require('./expenditureRouter')
const category_Income = require('./incomeRouter')

router.use('/expenditure', categoryRouter)
router.use('/income', category_Income)


module.exports = router