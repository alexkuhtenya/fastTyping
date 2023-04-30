const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const User = require('../models/User')
const crypto = require('crypto')
const argon2 = require('argon2')
const {hash} = require("argon2");

const GOOGLE_CLIENT_ID = '171707720998-eg9uvap1bdciggk0ci05bc91vuphqmkb.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/redirect",
    },
      async function(request, accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value
        await User.findOne({email}).then(async function(err, user){
            const name = email.split('@')
            if(err) {return done(err)}
            if (user) {
                return done(null ,user)
                } else {
                const hashPassword = await argon2.hash(crypto.randomBytes(4).toString('hex'));
                const newUser = new User({
                    email : email,
                    username : name[0],
                    password : hashPassword
                })
               await newUser.save()
                   .then(() =>{
                       console.log('пользователь успешно зарегистрирован' , newUser)
                   })
                   .catch((err) =>{
                       console.error('Ошибка регистрации', err)
                   })
                done(null,newUser);
            }

    }
)}))

passport.serializeUser(function (user, done){
    done(null, user)
});

passport.deserializeUser(function (user ,done){
    done(null, user)
})