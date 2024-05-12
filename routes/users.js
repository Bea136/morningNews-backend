var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/ckeckBody')

/* GET users listing. */
router.get('/', (req, res) => {
  User.find()
    .then(data => {
      res.json({ users: data })
    })
})

//ADD A NEW USER IN DB
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username })
    .then(data => {
      if (data) {
        res.json({ result: false, error: 'User already exists' })
        return
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password
        })
        newUser.save().then(newDoc => {
          res.json({ result: true, newUser: newDoc.username })
        })
      }
    })
});
//CONNECT A REGISTERED USER
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  User.findOne({ username: req.body.username, password: req.body.password })
    .then(data => {
      if (data) {
        res.json({ result: true, username: data.username  })
        console.log(data)
      } else {
        res.json({ result: false, error: 'User doesn\'t exists' })
      }
    })
});


module.exports = router;
