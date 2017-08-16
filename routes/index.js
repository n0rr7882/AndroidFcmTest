var express = require('express');
var FCM = require('fcm-node');
var router = express.Router();

var serverKey = '!@#$SERVERKEY!@#$';
var fcm = new FCM(serverKey);

var list = [];

/* GET home page. */
router.get('/test', (req, res) => {
  var user = { name: req.query.name, number: req.query.number };
  list.push(user);
  res.json(user);
});

router.post('/test', (req, res) => {
  var user = { name: req.body.name, number: req.body.number };
  var message = {
    to: '/topics/news',
    collapse_key: 'AbCdEfGhIjKlMnOpQrStUvWxYz',
    notification: {
      title: 'new data!',
      body: `name: ${req.body.name}, number: ${req.body.number}`,
      icon: 'myicon',
      sound: 'mySound'
    },
    data: {
      title: 'new data!',
      message: `name: ${req.body.name}, number: ${req.body.number}`
    }
  }
  list.push(user);
  res.json(user);
  fcm.send(message, (err, response) => {
    if (err) {
      console.log("Something has gone wrong!")
    } else {
      console.log("Successfully sent with response: ", response)
    }
  });
});

router.get('/list', (req, res) => {
  res.json(list);
});

router.post('/upload', (req, res) => {
  if (req.files && req.files.file) {
    req.files.file.mv(`./public/${req.files.file.name}`, (err) => {
      if (!err) {
        res.json({ status: true, message: `successfully uploaded :)` });
      } else {
        console.error(err.stack);
        res.json({ status: false, message: `upload failed :(` });
      }
    });
  } else {
    res.json({ status: false, message: `File not found :(` });
  }
});

module.exports = router;
