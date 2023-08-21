const mysql = require('mysql');

exports.connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerceshop',
});
