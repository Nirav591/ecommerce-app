const { connection } = require('../config/db.config');

exports.checkUsernameOrEmail = (req, res, next) => {
  connection.getConnection(async (err, connection) => {
    if (err) {
      console.log('error:', err);
      return res.status(500).send({
        message: 'Database connection error',
      });
    }
    console.log(`Connection as id ${connection.threadId}`);

    // Username
    const username = req.body.username;
    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, userByUsername) => {
      if (error) {
        connection.release();
        return res.status(500).json({ error: 'Database query error' });
      }
      if (userByUsername.length) {
        connection.release();
        res.status(400).send({
          message: 'Failed! Username is already in use!',
        });
        return;
      }
      //email
      const email = req.body.email;
      connection.query('SELECT * FROM users WHERE email = ?', [email], (error, userByEmail) => {
        connection.release();
        if (error) {
          return res.status(500).json({ error: 'Database query error' });
        }
        if (userByEmail.length) {
          res.status(400).send({
            message: 'Failed! Email is already in use!',
          });
          return;
        }
        next();
      });
    });
  });
};
