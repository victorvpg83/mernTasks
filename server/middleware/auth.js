const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    //read header token
    const token = req.header('x-auth-token')

    // review token
    if(!token) {
        return res.status(401).json({msg: 'No hay token, permiso no válido'})
    }
    //validate token
    try {
        const crypt = jwt.verify(token, process.env.SECRET)
        req.user = crypt.user
        next()
    } catch (error) {
        res.status(401).json({msg:'Token no válido'})
    }
}