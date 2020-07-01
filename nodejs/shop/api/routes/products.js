const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      console.log('Found ', docs);
      res.status(200).json(docs);
    })
    .catch((error) => {
      console.log('Error', error.message);
      res.status(500).json({
        error: error.message,
      });
    });
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .exec()
    .then((doc) => {
      if (doc) {
        console.log('Found ', doc);
        res.status(200).json(doc);
      } else {
        console.log('Not Found');
        res.status(404).json({
          message: 'Not existing ID',
        });
      }
    })
    .catch((error) => {
      console.log('Error', error.message);
      res.status(500).json({
        error: error.message,
      });
    });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log('Saved new product');
      res.status(200).json({
        message: 'Saved new product',
        product: product,
      });
    })
    .catch((err) => {
      console.log('Error to save new product');
      res.status(500).json({
        error: error.message,
      });
    });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateObject = {};
  for (const ops in req.body) {
    updateObject[ops] = req.body[ops];
  }
  Product.update({ _id: id }, { $set: updateObject })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: error.message,
      });
    });
});

router.delete('/', (req, res, next) => {
  Product.remove({ _id: req.body.id })
    .exec()
    .then((result) => {
      console.log('Deleted a product with ID ', req.body.id);
      res.status(200).json({
        message: 'Deleted',
        id: req.body.id,
      });
    })
    .catch((err) => {
      console.log('Error to delete a product');
      res.status(500).json({
        error: error.message,
      });
    });
});

module.exports = router;
