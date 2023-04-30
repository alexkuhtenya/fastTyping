const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String , required : true,  unique: true},
    password: {type: String, required: true},
    email: {type: String , unique: true},
    country : {type: String},
    roles: [{type:String , ref: 'Role'}],
    attempts : [{type: Schema.Types.ObjectId, ref : "Attempts"}],
    topScore : {type: Number , default: 0}
})

module.exports = model('User' , User)