const { connection } = require('../config/db.config');

exports.addCategory = async (req, res) => {
  try {
    const { categoryName, status } = req.body;

    const query = `
      INSERT INTO category (categoryName, status)
      VALUES (?, ?)
    `;

    connection.getConnection((err, connection) => {
      if (err) {
        console.log('error:', err);
        return res.status(400).send('Database connection error!');
      }

      connection.query(query, [categoryName, status], (err, result) => {
        connection.release();
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred while inserting data' });
        }
        res.status(200).json({ message: 'Data uploaded successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getCategory = (req, res) => {
  connection.getConnection((err, connection) => {
    connection.release();
    if (err) {
      console.log('error:', err);
      return res.status(400).send('Database connection error!');
    }

    connection.query('SELECT * FROM category', (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while getting data' });
      }
      res.status(200).json(result);
    });
  });
};
