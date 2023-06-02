const filter = (Product, query) => {
  // Filtering with name.
  const keyword = query.keyword
    ? {
        name: {
          $regex: query.keyword,
          $options: 'i',
        },
      }
    : {};

  // Finding product filtered with name
  Product = Product.find({ ...keyword });

  // Category Filtering
  if (query.category && query.category !== '[]') {
    categories = query.category.split(',');
    Product = Product.find({
      category: {
        $in: categories
      }
    });
  }

  // Price Filtering
  const min = query.min && Number(query.min);
  const max = query.max && Number(query.max);
  Product = Product.find({
    price: {
      $gte: min || 0,
      $lte: max || 1000
    }
  });

  // Ratings Filtering

  // Pagination Settings
  const resPerPage = 8;
  const currentPage = Number(query.page || 1);
  const skip = resPerPage * (currentPage - 1);

  return Product.limit(resPerPage).skip(skip);
};

module.exports = { filter };
