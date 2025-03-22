const express = require('express')
const router = express.Router()

const expenseRouter = require('./expenseRouter')
const incomeRouter = require('./incomeRouter')
const transactionRouter = require('./transactionRouter')
router.use('/expense', expenseRouter)
router.use('/income', incomeRouter)
router.use('/transaction',transactionRouter )

module.exports = router