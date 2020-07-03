const express = require('express');
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get('/', checkAuth, ProductController.get_all_products);

router.get('/:productId', checkAuth, ProductController.get_product_by_id);

router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  ProductController.create_new_product
);

router.patch('/:productId', checkAuth, ProductController.update_product);

router.delete('/', checkAuth, ProductController.delete_product);

module.exports = router;
