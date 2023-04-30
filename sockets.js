const socketIO = require('socket.io')
const {v4 : uuidv4} = require('uuid')
const attemptController = require('./controller/attemptController')

module.exports  = function setupSockets(server) {
    const io = socketIO(server)
    io.on('connection', (socket) => {
        console.log('a user connected');

            socket.on('joinGame' , () => {
                const gameId = uuidv4()
                socket.join(gameId);
                console.log(`user connected to game ${gameId}`)
            })


            socket.on('getAttempt' , async () => {
                const attempts  = await attemptController.getResult();
                socket.emit('attempts', attempts)
            })


            socket.on('disconnect', () => {
                console.log('user disconnected');
            })
    }
    )
}


