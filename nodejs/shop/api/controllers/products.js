const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get_all_products = (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            request: {
              type: 'GET',
              url: 'http://localhost:5000/products/' + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log('Error', error.message);
      res.status(500).json({
        error: error.message,
      });
    });
};

exports.get_product_by_id = (req, res, next) => {
  Product.findById(req.params.productId)
    .select('_id name price')
    .exec()
    .then((doc) => {
      if (doc) {
        console.log('Found ', doc);
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:5000/products/' + doc._id,
          },
        });
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
};

exports.create_new_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
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
        error: err.message,
      });
    });
};

exports.update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateObject = {};
  for (const ops in req.body) {
    updateObject[ops] = req.body[ops];
  }
  Product.update({ _id: id }, { $set: updateObject })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: 'http://localhost:5000/products/' + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.delete_product = (req, res, next) => {
  Product.remove({ _id: req.body.id })
    .exec()
    .then((result) => {
      console.log('Deleted a product with ID ', req.body.id);
      res.status(200).json({
        message: 'Product deleted',

        request: {
          type: 'POST',
          url: 'http://localhost:5000/products/',
          body: { name: 'String', price: 'Number' },
        },
      });
    })
    .catch((err) => {
      console.log('Error to delete a product');
      res.status(500).json({
        error: err.message,
      });
    });
};
