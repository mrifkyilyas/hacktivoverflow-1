require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes/')
const MailerJob = require('./cronjob')
// mongoose.connect('mongodb://localhost:27017/hacktivoverflow', { useNewUrlParser: true })

mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0-xt9f0.mongodb.net/stuckoncode?retryWrites=true`,{useNewUrlParser:true})



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)







app.listen(port, () => {
   MailerJob.start()
})
