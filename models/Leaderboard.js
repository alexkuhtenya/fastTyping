const {Schema , model} = require('mongoose')

const leaderboardSchema = new Schema({
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      topScore: {
        type: Number,
        default: 0
      }
    }
  ]
});

module.exports = model('Leaderboard', leaderboardSchema);
