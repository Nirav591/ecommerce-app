const express = require('express');
const { addSubCategory, getSubCategory } = require('../controllers/subcategory.controller');
const { verifyToken, verifyAdmin } = require('../middleware/authJwt');
const router = express.Router();

router.post('/', verifyToken, verifyAdmin, addSubCategory).get('/', verifyToken, verifyAdmin, getSubCategory);

exports.router = router;
