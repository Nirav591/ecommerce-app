const express = require('express');
const { addToCart, getItemsByuserId } = require('../controllers/cart.controller');
const { verifyToken } = require('../middleware/authJwt');
const router = express.Router();

router.post('/', verifyToken, addToCart).get('/', verifyToken, getItemsByuserId);

exports.router = router;
