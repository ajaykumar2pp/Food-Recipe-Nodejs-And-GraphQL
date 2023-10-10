require('dotenv').config();
const mongoose = require('mongoose')

const connectMongoose =()=> mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
})
.then(()=>{
    console.log("GraphQL is Connected to MongoDB")
})
.catch((error)=>{
  console.log("GraphQL is not Connected to MongoDB",error)
})

module.exports ={connectMongoose}