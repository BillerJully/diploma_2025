require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const router = require('./router/index')


const PORT = process.env.PORT || 4444
const app = express()
app.use(express.json())
app.use('/api', router)


const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
              console.log(`server started on ${PORT} port`)})
    } catch (error) {
        console.log(error)
    }
    
}

start()

