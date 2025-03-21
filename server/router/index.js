const express = require('express')
const router = express.Router()

const expenseRouter = require('./expenseRouter')
const incomeRouter = require('./incomeRouter')

router.use('/expense', expenseRouter)
router.use('/income', incomeRouter)


module.exports = router