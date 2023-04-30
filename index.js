const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose').default
const PORT = process.env.PORT
const Session = require('express-session')
const http = require('http')
const MONGO_URI = process.env.MONGO_URI
const apiRouter = require('./router/apiRouter/apiRouter')
const middleware = require('./middleware/authMiddleware')
const setupSocket = require('./sockets');





const app = express()
const server = http.createServer(app)


setupSocket(server)


app.use(express.json())
app.use(Session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use('/api', apiRouter)

app.get('/' , (req,res) => {
    res.send('<a href="/api/auth/google">Authenticate with Google</a>')
})

app.get('/protected', middleware, (req,res) =>{
    res.send('all is work')
})


const start = async () => { 
    try {
        await mongoose.connect(MONGO_URI)
        server.listen(PORT , () => console.log(`server has been started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()


