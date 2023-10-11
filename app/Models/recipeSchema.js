const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
 name:{type:String},
 description:{type:String},
 date :{type:Date, default: Date.now()},
 thumbsUp:{type:Number},
 thumbsDown:{type:Number}
},{ timestamps:true})

module.exports = mongoose.model('Recipe',recipeSchema)