const CronJob = require('cron').CronJob
const { nodemailer } = require('./helpers')
const { User, Question } = require('./models')
const kue = require('kue')
const queue = kue.createQueue()

let MailerJob = new CronJob('0 0 8 * * 5', function() {
    User.find({})
    .then(users => {
        users.forEach(user => {
            let email = user.email
            let message = 'Your question information:\n'
            Question.find({
                user: user._id
            })
            .then(questions => {
                questions.forEach(question => {
                    message += `- ${question.title} have ${question.answers.length} answers, ${question.upvotes-question.downvotes} votes, and ${question.view.length} views  \n `
                })
                queue.create('email', {
                    email,
                    message
                }).save()
            })
            .catch(err => {
                console.log(err)
            })
        })
    })

    queue.process('email', function (job, done) {
        nodemailer.Mailer(job.data.email, job.data.message)
        done()
    })
})

module.exports = MailerJob