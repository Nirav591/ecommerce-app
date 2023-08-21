const mysql = require('mysql');

exports.connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'rC2nl8SAo3nHb9YU',
  database: 'ecommerce',
});
