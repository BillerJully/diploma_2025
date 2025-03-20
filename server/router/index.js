const express = require('express')
const router = express.Router()

const categoryRouter = require('./routerCategory')
const category_Income = require('./incomeRouter')

router.use('/category-expenditure', categoryRouter)
router.use('/category-income', category_Income)


module.exports = router