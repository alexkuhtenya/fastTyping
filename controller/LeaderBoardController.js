const User = require('../models/User')
const Leaderboard = require('../models/Leaderboard')

class LeaderBoardController{
   async rewriteLB(req,res) {
        try {
            const topUsers = await User.find().sort({topScore: -1}).limit(10).select('username topScore')
            const leaderboard = await Leaderboard.findOne()
            leaderboard.users = topUsers.map(user => ({user : user._id, topScore: user.topScore}))
           await leaderboard.save()
            return res.json(leaderboard)
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = new LeaderBoardController()