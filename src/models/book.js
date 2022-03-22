const timeStamps = require('mongoose-timestamp')
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
   title:{type:String},
   pages:{type: Number},
   writer:{type:String},
   publisher:{type:String},
   

})
bookSchema.plugin(timeStamps)
module.exports = mongoose.model("Book",bookSchema)