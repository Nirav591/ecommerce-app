const express = require('express');
const multer = require('multer');

const { addProduct, getProduct, getProductById } = require('../controllers/product.controller');
const { verifyToken } = require('../middleware/authJwt');
const { verifyAdmin } = require('../middleware/authJwt');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router
  .post(
    '/',
    upload.fields([
      { name: 'singleImage', maxCount: 1 },
      { name: 'galleryImages', maxCount: 5 },
    ]),
    verifyToken,
    verifyAdmin,
    addProduct
  )
  .get('/', verifyToken, verifyAdmin, getProduct)
  .get('/:id', verifyToken, getProductById);

exports.router = router;
