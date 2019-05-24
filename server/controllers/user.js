const { User } = require('../models')
const { bcrypt, jwt } = require('../helpers')
const axios = require('axios')
class userController {
    static register(req, res) {
        let { name, email, password } = req.body
        User.create({
            name, email, password
        })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(err => {
                if (err.errors.name) {
                    res.status(400).json({
                        message: err.errors.name.message
                    })
                } else if (err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })

    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
            .then(found => {
                // console.log(req.body.password)
                // console.log(found)
                if (found && bcrypt.compare(req.body.password, found.password)) {
                    let access_token = jwt.sign({
                        email: found.email,
                        id: found._id
                    })
                    res.status(200).json({
                        access_token, name: found.name, email: found.email
                    })
                } else {
                    res.status(400).json({
                        message: 'password yang anda masukan salah'
                    })
                }

            })
            .catch(err => {
                res.status(500).json('password yang anda masukan salah')
            })
    }

    static watchedTag(req, res) {
        console.log('masuk sini')
        const id = req.userLogin
        console.log(req.userLogin)
        User.findById(id)
            .then((found) => {
                let exist = found.watchedTags.indexOf(req.body.tag) < 0
                if (exist) {
                    found.watchedTags.push(req.body.tag)
                    return found.save()
                } else {
                    res.status(401).json({
                        message: "tag sudah ada"
                    })
                }
            })
            .then((succes) => {
                console.log(succes, 'ini dia')
                res.status(200).json(succes)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getdata(req, res) {
        const id = req.userLogin
        console.log(req.userLogin)
        User.findById(id)
            .then(found => {
                res.status(200).json(found)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getJob(req, res) {
        axios
            .get('https://jobs.github.com/positions.json?description=javascript&page=1')
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })


    }
}

module.exports = userController