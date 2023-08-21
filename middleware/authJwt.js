const { connection } = require('../config/db.config');
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.send('No token Provided ');
  }
  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({
      message: 'Unauthorized!',
    });
  }
};

exports.verifyAdmin = (req, res, next) => {
  const userId = req.userId;
  // console.log('userId', userId);
  connection.getConnection((err, connection) => {
    if (err) {
      return res.send({ message: 'Database connection error' });
    }
    connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
      connection.release();
      if (err) {
        res.send({ error: err });
      }
      if (user.length) {
        // console.log('user', user);
        if (user[0].role === 'admin') {
          next();
          return;
        } else {
          res.json({
            message: 'Require Admin Role!',
          });
        }
      } else {
        return res.status(400).send('No such user find');
      }
    });
  });
};
