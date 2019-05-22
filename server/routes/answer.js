const router = require('express').Router()
const {answerContr} = require('../controllers')
const auth = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorizeanswer')



router.post('/',auth,answerContr.post)
router.get('/:id',answerContr.getone)
router.put('/:id',auth,authorize,answerContr.editAnswer)
router.delete('/:id',auth,authorize,answerContr.delete)
router.post('/upvotes/:id',auth,answerContr.upvotes)
router.post('/downvotes/:id',auth,answerContr.downvotes)











module.exports = router