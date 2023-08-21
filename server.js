const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');

const app = express();

const authRoute = require('./routes/auth.routes');
const userRoute = require('./routes/user.routes');
const productRoute = require('./routes/product.routes');
const categoryRoute = require('./routes/category.routes');
const subcategoryRoute = require('./routes/subcategory.routes');
const cartRoute = require('./routes/cart.routes');
const orderRoute = require('./routes/order.routes');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'bezkoder-session',
    keys: ['COOKIE_SECRET'],
    httpOnly: true,
    sameSite: 'strict',
  })
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});

app.use('/auth', authRoute.router);
app.use('/user', userRoute.router);
app.use('/product', productRoute.router);
app.use('/category', categoryRoute.router);
app.use('/subcategory', subcategoryRoute.router);
app.use('/cart', cartRoute.router);
app.use('/order', orderRoute.router);

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
