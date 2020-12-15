require("dotenv").config();
var User = require('../model/User');
var Message = require('../model/Message');
var Room = require('../model/Chatroom');

const isLoggedIn = require("./middleware");

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET
var bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.ROUNDS);

module.exports = function (app) {

  app.post('/signin', function (req, res) {
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, result) {

          if (result) {
            const payload = {
              _id: user._id,
              username: user.username
            };
            // Authenticate using JWT
            let token = jwt.sign(payload, secret, {
              expiresIn: 2000
            });
            // send encrypted token to client
            res.json({
              status: "success",
              token: token,
              message: user.username + " is successfully logged in",
              detail: { _id: user.id, username: user.username }
            });

          }
          else {
            res.json({
              // Duplicate account
              status: "error",
              message: "Incorrect Password or Username!"
            });

          }
        });

      }
      else {
        res.json({
          // Duplicate account
          status: "error",
          message: req.body.username + "not exists!"
        });
      }

    });

  });

  app.post('/signup', function (req, res) {
    const newUser = {
      username: req.body.username,
      password: req.body.password
    }
    User.findOne({ username: newUser.username }).then(user => {
      if (!user) {
        bcrypt.hash(newUser.password, saltRounds, function (err, hash) {

          newUser.password = hash;
          User.create(newUser)
            .then(usr => {
              Room.create({ _id: usr._id }).then(room => {
                const payload = {
                  _id: usr._id,
                  username: newUser.username
                };
                // Authenticate using JWT
                let token = jwt.sign(payload, secret, {
                  expiresIn: 2000
                });
                // send encrypted token to client
                res.json({
                  status: "success",
                  token: token,
                  message: newUser.username + " is successfully registered!"
                });
              }).catch(err => {
                console.log(err, "iko1")
              });
            }).catch(err => {
              console.log(err, "iko2")
            });

        })
      }
      else {
        res.json({
          // Duplicate account
          status: "error",
          message: newUser.username + " already exists!"
        });
      }
    })
  });




  app.get('/', (req, res) => {
    Message.find().then((x) => res.json(x)).catch((err) => res.json({ err: 'error' }))
  })

  app.post('/', (req, res) => {
    var d = new Date();
    const message = new Message({
      message: req.body.message,
      time: d.getHours() + ':' + d.getMinutes(),
    })
    message.save()
      .then(() => res.json(message));
  })
}