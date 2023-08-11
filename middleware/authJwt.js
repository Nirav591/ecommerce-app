const { connection } = require('../config/db.config');
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('headers', token);
  if (!token) {
    return res.send('No token Provided ');
  }
  try {
    jwt.verify(token, 'secretKey');
    next();
  } catch (err) {
    return res.status(401).send({
      message: 'Unauthorized!',
    });
  }
};
