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
  res.status(200).json({
    message: 'Post OK',
  });
});

module.exports = router;
