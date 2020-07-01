const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Get OK',
  });
});

router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'ID ' + req.params.orderId,
  });
});

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(200).json({
    message: 'Post OK',
    order: order,
  });
});

module.exports = router;
