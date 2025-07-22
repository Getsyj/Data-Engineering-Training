use("bookstoreDB");

// Insert Data

db.books.insertMany([
  { book_id: 101, title: "The AI Revolution", author: "Ray Kurzweil", genre: "Technology", price: 799, stock: 20 },
  { book_id: 102, title: "Mystery of the Old Manor", author: "Agatha Christie", genre: "Mystery", price: 450, stock: 15 },
  { book_id: 103, title: "Journey to Mars", author: "Elon Musk", genre: "Science Fiction", price: 999, stock: 10 },
  { book_id: 104, title: "Mindfulness Now", author: "Thich Nhat Hanh", genre: "Self-Help", price: 550, stock: 12 },
  { book_id: 105, title: "The History of India", author: "Romila Thapar", genre: "History", price: 675, stock: 8 }
]);

db.customers.insertMany([
  { customer_id: 1, name: "Anjali Mehra", email: "anjali@example.com", city: "Hyderabad" },
  { customer_id: 2, name: "Ravi Kumar", email: "ravi@example.com", city: "Delhi" },
  { customer_id: 3, name: "Fatima Shaikh", email: "fatima@example.com", city: "Mumbai" },
  { customer_id: 4, name: "John D’Souza", email: "john@example.com", city: "Hyderabad" },
  { customer_id: 5, name: "Leena Patel", email: "leena@example.com", city: "Ahmedabad" }
]);

db.orders.insertMany([
  { order_id: 1, customer_id: 1, book_id: 101, order_date: new Date("2023-05-12"), quantity: 2 },
  { order_id: 2, customer_id: 2, book_id: 103, order_date: new Date("2023-06-01"), quantity: 1 },
  { order_id: 3, customer_id: 3, book_id: 102, order_date: new Date("2022-12-20"), quantity: 3 },
  { order_id: 4, customer_id: 4, book_id: 104, order_date: new Date("2023-03-18"), quantity: 1 },
  { order_id: 5, customer_id: 1, book_id: 105, order_date: new Date("2024-01-10"), quantity: 2 },
  { order_id: 6, customer_id: 5, book_id: 101, order_date: new Date("2023-08-20"), quantity: 1 },
  { order_id: 7, customer_id: 1, book_id: 103, order_date: new Date("2023-09-15"), quantity: 1 }
]);


// 1
db.books.find({ price: { $gt: 500 } });

// 2
db.customers.find({ city: "Hyderabad" });

// 3
db.orders.find({ order_date: { $gt: new Date("2023-01-01") } });

// 4
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  {
    $project: {
      _id: 0,
      order_id: 1,
      order_date: 1,
      quantity: 1,
      customer_name: { $arrayElemAt: ["$customer.name", 0] },
      book_title: { $arrayElemAt: ["$book.title", 0] }
    }
  }
]);

// 5
db.orders.aggregate([
  {
    $group: {
      _id: "$book_id",
      total_quantity: { $sum: "$quantity" }
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  {
    $project: {
      book_title: { $arrayElemAt: ["$book.title", 0] },
      total_quantity: 1
    }
  }
]);

// 6
db.orders.aggregate([
  {
    $group: {
      _id: "$customer_id",
      total_orders: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  {
    $project: {
      customer_name: { $arrayElemAt: ["$customer.name", 0] },
      total_orders: 1
    }
  }
]);

// 7
db.orders.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $group: {
      _id: "$book_id",
      book_title: { $first: "$book.title" },
      total_revenue: { $sum: { $multiply: ["$quantity", "$book.price"] } }
    }
  }
]);

// 8
db.orders.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $group: {
      _id: "$book_id",
      book_title: { $first: "$book.title" },
      total_revenue: { $sum: { $multiply: ["$quantity", "$book.price"] } }
    }
  },
  { $sort: { total_revenue: -1 } },
  { $limit: 1 }
]);

// 9
db.orders.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $group: {
      _id: "$book.genre",
      total_sold: { $sum: "$quantity" }
    }
  }
]);

// 10
db.orders.aggregate([
  {
    $group: {
      _id: { customer_id: "$customer_id", book_id: "$book_id" }
    }
  },
  {
    $group: {
      _id: "$_id.customer_id",
      unique_books: { $sum: 1 }
    }
  },
  {
    $match: {
      unique_books: { $gt: 2 }
    }
  },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  {
    $project: {
      customer_name: { $arrayElemAt: ["$customer.name", 0] },
      unique_books: 1
    }
  }
]);
