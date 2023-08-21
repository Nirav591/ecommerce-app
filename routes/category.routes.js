const express = require('express');
const { addCategory, getCategory } = require('../controllers/category.controller');
const { verifyToken, verifyAdmin } = require('../middleware/authJwt');
const router = express.Router();

router.post('/', verifyToken, verifyAdmin, addCategory).get('/', verifyToken, verifyAdmin, getCategory);
exports.router = router;
