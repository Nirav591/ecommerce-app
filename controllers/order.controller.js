const { connection } = require('../config/db.config');

exports.createOrder = (req, res) => {
  console.log("req", req.body);
  try {
    const userId = req.userId;
    const { shipping_address, paymentMethod, totalPrice, totalQuantity, items}=req.body;
    const query = `
      INSERT INTO \`order\` (userId, shipping_address, payment_method, total_price, total_quantity, items)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.getConnection((err, connection) => {
      if (err) {
        console.log('error:', err);
        return res.status(400).send('Database connection error!');
      }

      connection.query(query, [userId, JSON.stringify(shipping_address), paymentMethod, totalPrice, totalQuantity, JSON.stringify(items)], (err, result) => {
        connection.release();
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred while inserting data' });
        }

        
        connection.query('DELETE FROM cart WHERE userId = ?',[userId],(err, items)=>{
          if(!err){
            console.log("Cart is empty successfully!");
          }
        })

        res.status(200).json({ message: 'Create order successfully' ,orderId: result.insertId});
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
// exports.getItemsByuserId = (req, res) => {
//   try {
//     connection.getConnection((err, connection) => {
//       if (err) {
//         console.log('error:', err);
//         return res.status(400).send('Database connection error!');
//       }
//       connection.query('SELECT * FROM cart WHERE userId = ?', [req.userId], (err, result) => {
//         if (err) {
//           console.error(err);
//           connection.release();
//           return res.status(500).json({ error: 'An error occurred while fetching data' });
//         }
//         const promises = result.map((cartItem) => {
//           return new Promise((resolve, reject) => {
//             connection.query('SELECT * FROM product WHERE id = ?', [cartItem.productId], (err, data) => {
//               if (err) {
//                 console.error(err);
//                 reject(err);
//               }
//               const item = { product: data[0], quantity: cartItem.quantity };
//               resolve(item);
//             });
//           });
//         });

//         Promise.all(promises)
//           .then((cartItems) => {
//             connection.release();
//             res.status(200).json(cartItems);
//           })
//           .catch((error) => {
//             console.error(error);
//             connection.release();
//             res.status(500).json({ error: 'An error occurred' });
//           });
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };
