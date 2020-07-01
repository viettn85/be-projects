const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Get OK',
  });
});

router.get('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'ID ' + req.params.productId,
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Post OK',
  });
});

module.exports = router;
