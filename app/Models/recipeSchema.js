const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
 name:{type:String},
 description:{type:String},
 createdAt :{type:Date, default: Date.now()},
 thumbsUp:{type:Number},
 thumbsDown:{type:Number}
}, {timeStamp:true})

module.exports = mongoose.model('Recipe',recipeSchema)