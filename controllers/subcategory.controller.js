const { connection } = require('../config/db.config');

exports.addSubCategory = async (req, res) => {
  try {
    const { subCategoryName, status } = req.body;

    const query = `
      INSERT INTO subcategory (subCategoryName, status)
      VALUES (?, ?)
    `;

    connection.getConnection((err, connection) => {
      if (err) {
        console.log('error:', err);
        return res.status(400).send('Database connection error!');
      }

      connection.query(query, [subCategoryName, status], (err, result) => {
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

exports.getSubCategory = (req, res) => {
  connection.getConnection((err, connection) => {
    connection.release();
    if (err) {
      console.log('error:', err);
      return res.status(400).send('Database connection error!');
    }

    connection.query('SELECT * FROM subcategory', (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while getting data' });
      }
      res.status(200).json(result);
    });
  });
};

// exports.updateSubCat = (req,res) =>{
//   connection.getConnection((err, connection)=>{
//     if(err){
//       res.send("Connection error");
//     }
//     connection.query()
//   })
// }