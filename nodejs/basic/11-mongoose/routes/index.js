var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var assert = require('assert');
const { stringify } = require('querystring');
const e = require('express');

var url = 'mongodb+srv://admin:admin123@cluster0-sfmiw.mongodb.net/nodejs';
mongoose.connect(url);
var Schema = mongoose.Schema;
var UserSchema = new Schema(
  {
    title: { type: String, required: true },
    content: String,
    author: String,
  },
  { collection: 'user-data' }
);
var UserData = mongoose.model('UserData', UserSchema);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function (req, res, next) {
  UserData.find()
    .lean()
    .then(function (docs) {
      console.log('Doc', docs);
      res.render('index', { items: docs });
    });
});

router.post('/insert', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  new UserData(item).save();
  res.redirect('/');
});

router.post('/update', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  var id = req.body.id;
  UserData.findById(id, function (err, doc) {
    if (err) {
      console.log('Record not found');
    } else {
      doc.title = req.body.title;
      doc.content = req.body.content;
      doc.author = req.body.author;
      doc.save();
    }
  });
  res.redirect('/');
});

router.post('/delete', function (req, res, next) {
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;
