var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb+srv://admin:admin123@cluster0-sfmiw.mongodb.net';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function (req, res, next) {
  var resultArray = [];
  mongo.connect(url, function (err, client) {
    assert.equal(null, err);
    var db = client.db('nodejs');
    var cursor = db.collection('user-data').find();
    cursor.forEach(
      function (doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      },
      function () {
        db.close;
        res.render('index', { items: resultArray });
      }
    );
  });
});

router.post('/insert', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  mongo.connect(url, function (err, client) {
    assert.equal(err, null);
    var db = client.db('nodejs');
    db.collection('user-data').insertOne(item, function (err, result) {
      assert.equal(err, null);
      console.log('Inserted item ' + item);
      db.close;
    });
  });
  res.redirect('/');
});

router.post('/update', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  var id = req.body.id;
  mongo.connect(url, function (err, client) {
    assert.equal(err, null);
    var db = client.db('nodejs');
    db.collection('user-data').updateOne(
      { _id: objectId(id) },
      { $set: item },
      function (err, result) {
        assert.equal(err, null);
        console.log('Inserted item ' + item);
        db.close;
      }
    );
  });
  res.redirect('/');
});

router.post('/delete', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  var id = req.body.id;
  mongo.connect(url, function (err, client) {
    assert.equal(err, null);
    var db = client.db('nodejs');
    db.collection('user-data').deleteOne({ _id: objectId(id) }, function (
      err,
      result
    ) {
      assert.equal(err, null);
      console.log('Inserted item ' + item);
      db.close;
    });
  });
  res.redirect('/');
});

module.exports = router;
