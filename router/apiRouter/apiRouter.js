const {Router} = require('express')
const router = new Router()
const authRouter = require('../authRouter/authRouter')
const attemptRouter=  require('../attemptRouter/attemptRouter')
const leaderboardRouter = require('../leaderboardRouter/leaderboardRouter')

router.use('/auth', authRouter)
router.use('/attempt', attemptRouter)
router.use('/leaderboard', leaderboardRouter)


module.exports = router;
