const express = require('express')
const router = express.Router()

const authRouter = require('./authRouter')
const expenseRouter = require('./expenseRouter')
const incomeRouter = require('./incomeRouter')
const transactionRouter = require('./transactionRouter')

router.use('/expense', expenseRouter)
router.use('/income', incomeRouter)
router.use('/transaction',transactionRouter )
router.use('/auth', authRouter)

module.exports = router