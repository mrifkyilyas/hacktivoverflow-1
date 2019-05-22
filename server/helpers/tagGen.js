const Tag = require('../models/tag')

module.exports = {
    tagChek(tags) {
        console.log(tags)
        tags.map(e => {
            Tag.findOne({
                name: e
            })
            .then(tag => {
                if(!tag) {
                    return Tag.create({
                        name: e
                    })
                }
            })
            .then(tag => {
                console.log(tag)

            })
            .catch(err => {
                console.log(err)
            })
        });
        return tags
    }
}