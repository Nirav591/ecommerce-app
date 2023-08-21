const express = require('express');
const { updateUser, getAllUsers } = require('../controllers/user.controller');
const { verifyToken, verifyAdmin } = require('../middleware/authJwt');
const router = express.Router();

router.put('/', verifyToken, updateUser).get('/', verifyToken, verifyAdmin, getAllUsers);

exports.router = router;
