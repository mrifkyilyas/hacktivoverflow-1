const {Answer}= require('../models/')

module.exports = function(req, res, next) {
    
    try {
       
       Answer.findOne({
            _id: req.params.id
        })
        .then(result => {
           
            
            if(result && result.user == req.userLogin) {               
                console.log(req.userLogin)
                next()
            } else {
                throw new Error(`Bad request`)
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
    } catch(err) {
        res.status(400).json({
            message: 'Bad request'
        })
    }
}