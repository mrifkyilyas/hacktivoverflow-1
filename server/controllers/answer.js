
const { Question, User, Answer } = require('../models')
class answerController {

  static post(req, res) {
    let instanceAnswer
    req.body.user = req.userLogin
    Answer
      .create({
        ...req.body
      })
      .then(answer => {
        console.log(answer)
        instanceAnswer = answer
        return Question
          .findById(answer.question)
          .populate('answers')
      })
      .then(question => {
        console.log(question)
        question.answers.push(instanceAnswer._id)
        return question.save()
      })
      .then(() => {
        return Question
          .findById(req.params.id)
          .populate('questioner')
          .populate({
            path: 'answers',
            populate: {
              path: 'responder'
            }
          })
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static upvotes(req, res) {
    console.log('masuk')
    Answer
      .findById(req.params.id)
      .populate('user')
      .then(answer => {
        console.log('masuk up votess answerr')
        console.log(answer.user._id)
        console.log(req.userLogin);

        let samePerson = answer.user._id == req.userLogin
        let isExistUp = answer.upvotes.indexOf(req.userLogin) < 0
        let isExistDown = answer.downvotes.indexOf(req.userLogin) < 0
        if (samePerson) {
          res.status(400).json({ error: 'You cannot vote your answer' })
        } else if (isExistUp && isExistDown) {
          answer.upvotes.push(req.userLogin)
          return answer.save()
        } else if (!isExistDown) {
          answer.downvotes = answer.downvotes.filter(el => el != req.userLogin)
          answer.upvotes.push(req.userLogin)
          return answer.save()
        } else {
          answer.upvotes = answer.upvotes.filter(el => el != req.userLogin)
          return answer.save()
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })


  }
  static downvotes(req, res) {
    Answer
      .findById(req.params.id)
      .populate('user')
      .then(answer => {
        let samePerson = answer.user._id == req.userLogin
        let isExistUp = answer.upvotes.indexOf(req.userLogin) < 0
        let isExistDown = answer.downvotes.indexOf(req.userLogin) < 0

        if (samePerson) {
          res.status(400).json({ error: 'You cannot vote your answer' })
        } else if (isExistUp && isExistDown) {
          answer.downvotes.push(req.userLogin)
          return answer.save()
        } else if (!isExistUp) {
          answer.upvotes = answer.upvotes.filter(el => el != req.userLogin)
          answer.downvotes.push(req.userLogin)
          return answer.save()
        } else {
          answer.downvotes = answer.downvotes.filter(el => el != req.userLogin)
          return answer.save()
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static delete(req, res) {
    console.log('masuk delete')
    Answer
      .findOneAndDelete({
        _id: req.params.id,
      })
      .then(() => {
        res.status(200).json({
          message: 'Successfully deleted Answer'
        })
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
  static getone(req, res) {
    Answer
      .findById(req.params.id)
      .populate('user')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  static editAnswer(req, res) {
    const {title,description} = req.body
    Answer
      .findByIdAndUpdate(req.params.id, {
        title,description
      })
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
}


}
module.exports = answerController