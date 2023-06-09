const express = require('express');
const dotenv = require('dotenv');
const products = require('./routes/product');
const users = require('./routes/user');
const order = require('./routes/order');
const payment = require('./routes/payment');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { seederProducts } = require('./data/seeder');

const app = express();

//Setting up environment variables with dotenv
dotenv.config();

// Connecting Database
connectDB();

// Middlewares.
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/order', order);
app.use('/api/payment', payment);

// Settings up cloudinary configuration.
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

//seederProducts();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/frontend/build'));
}

PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(
    `Server started on Port: ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
