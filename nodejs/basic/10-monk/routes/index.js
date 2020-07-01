var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var url = 'mongodb+srv://admin:admin123@cluster0-sfmiw.mongodb.net/nodejs';
var db = require('monk')(url);
var userData = db.get('user-data');
var assert = require('assert');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function (req, res, next) {
  userData.find({}).then((docs) => {
    console.log('Data', docs);
    res.render('index', { items: docs });
  });
});

router.post('/insert', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  userData.insert(item);
  res.redirect('/');
});

router.post('/update', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  var id = req.body.id;
  console.log('ID', id);
  userData
    .update({ _id: objectId(id) }, { $set: item })
    .then((updatedDoc) => console.log(updatedDoc));

  res.redirect('/');
});

router.post('/delete', function (req, res, next) {
  var id = req.body.id;
  userData.remove({ _id: id });
  res.redirect('/');
});

module.exports = router;
