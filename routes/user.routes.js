const express = require('express');
const { userBoard } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/authJwt');
const router = express.Router();

router.get('/', verifyToken, userBoard).get('/verification', verifyToken);

exports.router = router;
