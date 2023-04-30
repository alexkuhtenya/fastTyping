const Router = require('express')
const router = new Router()
const controller = require('../../controller/LeaderBoardController')
const authMiddleware = require('../../middleware/authMiddleware')



router.get('/getLB' , controller.rewriteLB)

module.exports = router