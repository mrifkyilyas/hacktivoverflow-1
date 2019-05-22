const Tag = require('../models/tag')

class controllerTag {

    static findAll(req, res) {
        Tag
            .find({})
            .then(tags => {
                res.status(200).json(tags)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

}

module.exports = controllerTag