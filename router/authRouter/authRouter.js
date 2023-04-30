const Router = require('express')
const router = new Router()
const controller = require('../../controller/authController')
const {check} = require('express-validator')
const authMiddleware = require('../../middleware/authMiddleware')
require('../../config/passport')
const passport = require('passport')



router.post('/registration' , [
    check('username' , 'Имя пользователя должно быть длинее 4 символов').isLength({min:5}),
    check('password', 'Пароль должен быть длинее 6 символов').isLength({min:6})
],controller.registration)
router.post('/login' , controller.login)
router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}))
router.get('/google/redirect',
    passport.authenticate('google',{
        successfulRedirect : '/protected',
        failureRedirect : '/failure'
    }))
router.get('/users' , authMiddleware,controller.getUsers)


module.exports = router