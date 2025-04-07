const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token = req.headers.authorization

    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
        return res.status(401).json({ message: "нет доступа" })
        }
                
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
                
    } catch (e) {
        res.status(401).json({ message: "Ошибка авторизации" })
    }
}