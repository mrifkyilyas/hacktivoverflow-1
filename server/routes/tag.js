const router = require('express').Router()
const {tagContr} = require('../controllers')


router.get('/',tagContr.findAll)










module.exports = router