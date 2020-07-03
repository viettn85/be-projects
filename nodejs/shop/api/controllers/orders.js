const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select('product quantity _id')
    .populate('product')
    .exec()
    .then((orders) => {
      const response = {
        count: orders.length,
        orders: orders.map((order) => {
          return {
            _id: order._id,
            product: order.product,
            quantity: order.quantity,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.orders_get_by_id = (req, res, next) => {
  Order.findById({ _id: req.params.orderId })
    .populate('product')
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
        });
      }
      res.status(200).json({
        order: {
          _id: order._id,
          product: order.product,
          quantity: order.quantity,
        },
        request: {
          type: 'GET',
          url: 'http://localhost:5000/orders',
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.orders_create_new = (req, res, next) => {
  Product.findById({ _id: req.body.product })
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.product,
        quantity: req.body.quantity,
      });
      order
        .save()
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((err) => {
          res.status(500).json({
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.orders_delete = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      console.log(result);
      if (result.deletedCount == 0) {
        return res.status(404).json({
          message: 'Order not found',
        });
      }
      res.status(200).json({
        message: 'Order deleted',
        request: {
          type: 'POST',
          body: { productId: 'String', quantity: 'Number' },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
