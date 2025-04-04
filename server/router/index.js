const express = require('express')
const router = express.Router()
const authRouter = require('./authRouter')
const expenseRouter = require('./expenseRouter')
const incomeRouter = require('./incomeRouter')
const transactionRouter = require('./transactionRouter')
const authMiddleware = require('../middleware/authMiddleware')
router.use('/expense',authMiddleware, expenseRouter)
router.use('/income',authMiddleware, incomeRouter)
router.use('/transaction',authMiddleware,transactionRouter )
router.use('/auth',authMiddleware, authRouter)

module.exports = router