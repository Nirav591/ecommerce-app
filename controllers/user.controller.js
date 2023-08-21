const { connection } = require('../config/db.config');

exports.updateUser = (req, res) => {
  // try {
  //   connection.getConnection((err, connection) => {
  //     if (err) {
  //       console.log('error:', err);
  //       res.status(400).json({ error: 'Database connection error!' });
  //     }
  //     console.log(`Connection as id ${connection.threadId}`);
  //     connection.query(
  //       'UPDATE users SET address = ? WHERE id = ?',
  //       [JSON.stringify(req.body), req.userId],
  //       (err, result) => {
  //         if (err) {
  //           return res.status(500).json({ error: 'Database error' });
  //         }
  //         return res.status(200).json({ msg: 'User Updated with shipping address' });
  //       }
  //     );
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};

exports.getAllUsers = (req, res) => {
  try {
    connection.getConnection((err, connection) => {
      if (err) {
        console.log('error:', err);
        res.status(400).json({ error: 'Database connection error!' });
      }
      console.log(`Connection as id ${connection.threadId}`);
      connection.query('SELECT * FROM users', (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        return res.status(200).json(result);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
