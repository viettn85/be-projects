const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrderController = require('../controllers/orders');

router.get('/', checkAuth, OrderController.orders_get_all);

router.get('/:orderId', checkAuth, OrderController.orders_get_by_id);

router.post('/', checkAuth, OrderController.orders_create_new);

router.delete('/:orderId', checkAuth, OrderController.orders_delete);

module.exports = router;
