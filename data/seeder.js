const products = require('./products.json');
const Product = require('../models/product');
const connectDB = require('../config/db');

//connectDB();

const seederProducts = async () => {
  try {
    await Product.deleteMany();

    console.log('All Products are deleted');

    await Product.insertMany(products);
    console.log('Products are imported');

    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

module.exports = { seederProducts }