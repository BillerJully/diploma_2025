const express = require('express')
const PORT = 4444
const app = express()
app.use('/', (req, res) => {
    res.send('Server started')
})
app.listen(PORT, () => {
    console.log(`server started on ${PORT} port`)
})