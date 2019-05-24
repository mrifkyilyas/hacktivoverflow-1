const router = require('express').Router()
const {questionContr} = require('../controllers')
const auth = require('../middlewares/authenticate')
const author = require('../middlewares/authorize')
console.log('masuk server')

router.get('/',questionContr.list)
router.post('/',auth,questionContr.addQuestion)
router.get('/:id', questionContr.getOne);
router.post('/upvotes/:id',auth,questionContr.upvotes)
router.post('/downvotes/:id',auth,questionContr.downvotes)
router.post('/view/:id',auth,questionContr.addView)
router.delete('/:id',auth,author,questionContr.delete)
router.put('/:id',auth,author,questionContr.editQuestion)
router.get('/tag/:tagName',questionContr.getQuestionByTag);










module.exports = router