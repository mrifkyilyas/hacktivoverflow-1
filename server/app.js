require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes/')
mongoose.connect('mongodb://localhost:27017/hacktivoverflow',{useNewUrlParser:true})
// mongoose.connect('mongodb+srv://mrifkyilyas13:sayurkol@cluster0-xt9f0.mongodb.net/test?retryWrites=true',{useNewUrlParser:true})



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)









app.listen(port,()=>{
    console.log(`working on ${port}`)
})
