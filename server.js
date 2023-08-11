const express = require('express');
const cors = require('cors');

const app = express();

const authRoute = require('./routes/auth.routes');
const userRoute = require('./routes/user.routes');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute.router);
app.use('/user', userRoute.router);

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
