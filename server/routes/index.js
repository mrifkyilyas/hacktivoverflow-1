
const router = require('express').Router()
const user = require('./user')
const question = require('./question')
const answer = require('./answer')
const tag = require('./tag')


router.use('/user',user)
router.use('/question',question)
router.use('/answer',answer)
router.use('/tag',tag)








module.exports = router