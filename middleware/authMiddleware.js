const jwt = require('jsonwebtoken')
const {secret} = require("../conf/config")


module.exports = function (req ,res ,next){
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            if(!req.user){
        return res.status(403).json({message:"Пользователь не авторизован"})} else
            {
                next()
            }
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    }
         catch (e) {
        res.status(403).json(e)
    }
}
;