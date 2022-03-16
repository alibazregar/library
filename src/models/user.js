const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {type:String,trim:true},
    lastName: {type:String,trim:true},
    admin:{type:Boolean,trim:true,default:false},
    password:{type:String,trim:true, required:true},
    email:{type:String,trim:true,lowercase:true,required:true},
    books : [{type:mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }]

})

userSchema.plugin(timestamps)
module.exports = mongoose.model('User',userSchema)