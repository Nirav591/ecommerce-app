const { connection } = require('../config/db.config');
const mysql = require('mysql');

exports.addProduct = async (req, res) => {
  try {
    const singleImagePath = req.files['singleImage'][0].filename;
    const galleryImagePaths = [];
    for (let i = 0; i < req.files['galleryImages'].length; i++) {
      galleryImagePaths.push(req.files['galleryImages'][i].filename);
    }
    const {
      name,
      description,
      short_description,
      regular_price,
      sale_price,
      initial_quantity,
      size,
      color,
      category,
      subcategory,
      rating,
      tags,
    } = JSON.parse(req.body.productData);

    const query = `
      INSERT INTO product (name, description, short_description, regular_price, sale_price, initial_quantity, size, color, category, subcategory, rating, image, gallery, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.getConnection((err, connection) => {
      if (err) {
        console.log('error:', err);
        return res.status(400).send('Database connection error!');
      }

      connection.query(
        query,
        [
          name,
          description,
          short_description,
          regular_price,
          sale_price,
          initial_quantity,
          size,
          color,
          category,
          subcategory,
          rating,
          singleImagePath,
          JSON.stringify(galleryImagePaths),
          tags,
        ],
        (err, result) => {
          connection.release();
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while inserting data' });
          }
          res.status(200).json({ message: 'Data uploaded successfully' });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getProduct = (req, res) => {
  connection.getConnection((err, connection) => {
    connection.release();
    if (err) {
      console.log('error:', err);
      return res.status(400).send('Database connection error!');
    }

    connection.query('SELECT * FROM product', (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while getting data' });
      }
      res.status(200).json(result);
    });
  });
};

exports.getProductById = (req, res) => {
  connection.getConnection((err, connection) => {
    connection.release();
    if (err) {
      console.log('error:', err);
      return res.status(400).send('Database connection error!');
    }

    connection.query('SELECT * FROM product WHERE id = ?', [req.params.id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while getting data' });
      }
      res.status(200).json(result[0]);
    });
  });
};
