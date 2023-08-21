const express = require('express');
const { verifyToken } = require('../middleware/authJwt');
const { createOrder } = require('../controllers/order.controller');
const router = express.Router();

router.post('/', verifyToken, createOrder);

exports.router = router;
