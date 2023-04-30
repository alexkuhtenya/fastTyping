const Attempts = require('../models/Attempt')
const User = require('../models/User')

class attemptsController {
    async getResult(req, res){
        try {
            const {accuracy, score , owner } = req.body
            const topScore = 0;
            const attempts = new Attempts({accuracy,score,owner } )
            await attempts.save();
             const user =   await User.findOne({_id : req.body.owner}).exec()
            if (user){
                user.attempts = attempts
                if (user.topScore < req.body.score) {
                    user.topScore = req.body.score
                }
            }
            await user.save()
            return res.json(attempts)
        } catch (e) {
            console.log(e)
            res.status(500).json({message : "произошла ошибка на сервере"})
        }
    }
}

module.exports = new attemptsController()