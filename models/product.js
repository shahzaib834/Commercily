const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxlength: [5, 'Product price cannot exceed 100 characters'],
    default: 0.0,
  },
  desc: {
    type: String,
    required: [true, 'Please enter product price'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please select a category for this product'],
    enum: {
      values: [
        'Electronics',
        'Camera',
        'Laptop',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
        'Watches, Glasses And Jewellery',
        'Groceries',
        'Beauty',
        'Computer & Laptops'
      ],
      message: 'Please select correct category for product',
    },
  },
  soldBy: {
    type: String,
    required: [true, 'Please enter product seller'],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    minlength: [5, 'Minimum Stock cannot be less than 5 units'],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    default: 'Not Branded'
  },
  likesCount: {
    type: Number,
    default: 0
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      } 
    }
  ],
  reviews: {
    type: Array,
    default: []
  },
  // reviews: [
  //   {
  //     name: { type: String, required: true },
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User',
  //       required: true,
  //     },
  //     rating: { type: String, required: true },
  //     comment: { type: String, required: true },
  //   },
  // ],
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
