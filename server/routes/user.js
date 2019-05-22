const router = require('express').Router()
const {userContr} = require('../controllers')
const auth = require('../middlewares/authenticate')



router.post('/register',userContr.register)
router.post('/login',userContr.login)
router.post('/watchedtag',auth,userContr.watchedTag)
router.get('/getdata',auth,userContr.getdata)








module.exports = router