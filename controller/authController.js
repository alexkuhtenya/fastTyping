const User = require('../models/User')
const Role = require('../models/Role')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const {validationResult} = require("express-validator");
const {secret} = require('../conf/config.js')

const generateAccesToken = (id) => {
    const payload ={
       id
    }
    return jwt.sign(payload , secret , {expiresIn: "1024h"})
}

class authController {
    async registration(req , res) {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json(errors)
            }
            const {username, password ,email , role} = req.body
            const candidate = await User.findOne({username, email})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с данным именем уже существует'})
            }
            const hashPassword = await argon2.hash(password);
            const user = new User({username ,password:  hashPassword , roles: [role], email , attempts : null , topScore : 0})
            await user.save();
            return res.json({message: "пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    async getUsers(req , res) {
        try{
        const users = await User.find()
           return res.json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "login error"})
        }
    }

    async login(req ,res) {
        try{
            const {username , password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json(user)
            }
            const validPassword = await argon2.verify(user.password, password)
            if (!validPassword) {
                return res.status(400).json({message:"Невернные данные"})
            }
            const token = generateAccesToken(user._id)
            return res.json({token})
        } catch (e) {
            res.json(e.message)
        }
    }
}

module.exports = new authController()