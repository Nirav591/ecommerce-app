const express = require('express');
const { addToCart, getItemsByuserId, deleteCartItem, updateCartQuantity } = require('../controllers/cart.controller');
const { verifyToken } = require('../middleware/authJwt');
const router = express.Router();

router.post('/', verifyToken, addToCart).get('/', verifyToken, getItemsByuserId).delete('/:id', verifyToken, deleteCartItem).put('/:id', verifyToken, updateCartQuantity);

exports.router = router;
