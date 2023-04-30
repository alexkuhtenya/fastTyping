const {Schema, model} = require('mongoose')

const Attempt = new Schema({
    accuracy: {type: Number , required: true},
    score : {type: Number , required: true , default: 0},
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    attemptTime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('Attempt' , Attempt)