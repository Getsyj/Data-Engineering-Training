use ecommerce_store;

// Insert Collections

// Products
db.products.insertMany([
  { product_id: 1001, name: "Wireless Mouse", category: "Electronics", price: 750, stock: 120 },
  { product_id: 1002, name: "Bluetooth Speaker", category: "Electronics", price: 2200, stock: 80 },
  { product_id: 1003, name: "Yoga Mat", category: "Fitness", price: 599, stock: 150 },
  { product_id: 1004, name: "Office Chair", category: "Furniture", price: 7500, stock: 40 },
  { product_id: 1005, name: "Running Shoes", category: "Footwear", price: 3500, stock: 60 }
]);

// Orders
db.orders.insertMany([
  { order_id: 5001, customer: "Ravi Shah", product_id: 1001, quantity: 2, order_date: new Date("2024-07-01") },
  { order_id: 5002, customer: "Sneha Mehta", product_id: 1002, quantity: 1, order_date: new Date("2024-07-02") },
  { order_id: 5003, customer: "Arjun Verma", product_id: 1003, quantity: 3, order_date: new Date("2024-07-03") },
  { order_id: 5004, customer: "Neha Iyer", product_id: 1001, quantity: 1, order_date: new Date("2024-07-04") },
  { order_id: 5005, customer: "Mohit Jain", product_id: 1005, quantity: 2, order_date: new Date("2024-07-05") }
]);


// 1
db.products.find({ category: "Electronics" });

// 2
db.orders.find({ customer: "Ravi Shah" });

// 3
db.orders.find({ order_date: { $gt: new Date("2024-07-02") } });

// 4
db.products.find({ stock: { $lt: 50 } });

// 5
db.products.find({ price: { $gt: 2000 } });

// 6
db.orders.aggregate([
    {
        $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "product_id",
            as: "product_details"
        }
    },
    { $unwind: "$product_details" },
    {
        $project: {
            _id: 0,
            product_name: "$product_details.name",
            product_price: "$product_details.price"
        }
    }
]).pretty();

// 7
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $project: {
      customer: 1,
      total_spent: { $multiply: ["$quantity", "$product_info.price"] }
    }
  },
  {
    $group: {
      _id: "$customer",
      total_spent: { $sum: "$total_spent" }
    }
  }
]);

// 8
db.orders.aggregate([
    {
        $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "product_id",
            as: "product_details"
        }
    },
    { $unwind: "$product_details" },
    {
        $project: {
            _id: 0,
            order_id: 1,
            category: "$product_details.category"
        }
    }
]).pretty();

// 9
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  { $match: { "product_info.category": "Fitness" } },
  { $group: { _id: "$customer" } }
]);

// 10
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $group: {
      _id: "$product_info.category",
      total_sales: { $sum: { $multiply: ["$quantity", "$product_info.price"] } }
    }
  }
]);

// 11
db.orders.aggregate([
  {
    $group: {
      _id: "$product_id",
      total_units_sold: { $sum: "$quantity" }
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $project: {
      product_name: "$product_info.name",
      total_units_sold: 1
    }
  }
]);

// 12
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      average_price: { $avg: "$price" }
    }
  }
]);

// 13
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $project: {
      customer: 1,
      order_value: { $multiply: ["$quantity", "$product_info.price"] }
    }
  },
  { $sort: { order_value: -1 } },
  { $limit: 1 }
]);

// 14
db.orders.aggregate([
  {
    $group: {
      _id: "$product_id",
      order_count: { $sum: 1 }
    }
  },
  { $sort: { order_count: -1 } },
  { $limit: 3 },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $project: {
      product_name: "$product_info.name",
      order_count: 1
    }
  }
]);

// 15
db.orders.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$order_date" } },
      orders_count: { $sum: 1 }
    }
  },
  { $sort: { orders_count: -1 } },
  { $limit: 1 }
]);

// 16
db.customers.insertOne({ customer_name: "Kunal Patel" });
db.customers.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "customer_name",
      foreignField: "customer",
      as: "order_info"
    }
  },
  { $match: { order_info: { $size: 0 } } },
  { $project: { customer_name: 1 } }
]);

// 17
db.orders.insertMany([
  { order_id: 5006, customer: "Ravi Shah", product_id: 1003, quantity: 1, order_date: new Date("2024-07-06") },
  { order_id: 5007, customer: "Neha Iyer", product_id: 1002, quantity: 2, order_date: new Date("2024-07-07") }
]);
db.orders.aggregate([
  {
    $group: {
      _id: "$customer",
      orders_count: { $sum: 1 }
    }
  },
  { $match: { orders_count: { $gt: 1 } } }
]);

// 18
db.products.find({
  product_id: {
    $nin: db.orders.distinct("product_id")
  }
});

// 19
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  { $match: { "product_info.stock": { $lt: 100 } } },
  { $group: { _id: "$customer" } }
]);

// 20. 
db.products.aggregate([
  {
    $project: {
      name: 1,
      inventory_value: { $multiply: ["$price", "$stock"] }
    }
  },
  {
    $group: {
      _id: null,
      total_inventory_value: { $sum: "$inventory_value" }
    }
  }
]);
