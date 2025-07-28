// Use DB
use("expense_monitoring");

//receipts metadata
db.receipts.insertMany([
  {
    receipt_id: "receipt_009",
    user_id: 1,
    note: "Grocery shopping at D-Mart",
    image_path: "Week 2/receipts_images/receipt_009.jpg",
    uploaded_at: new Date("2024-02-01T10:00:00Z")
  },
  {
    receipt_id: "receipt_010",
    user_id: 2,
    note: "Uber to office",
    image_path: "Week 2/receipts_images/receipt_010.jpg",
    uploaded_at: new Date("2024-02-02T11:00:00Z")
  },
  {
    receipt_id: "receipt_011",
    user_id: 3,
    note: "Prime Video subscription",
    image_path: "Week 2/receipts_images/receipt_011.jpg",
    uploaded_at: new Date("2024-02-05T09:30:00Z")
  },
  {
    receipt_id: "receipt_012",
    user_id: 1,
    note: "Rent for February",
    image_path: "Week 2/receipts_images/receipt_012.jpg",
    uploaded_at: new Date("2024-02-01T08:00:00Z")
  },
  {
    receipt_id: "receipt_013",
    user_id: 2,
    note: "Pharmacy medicines",
    image_path: "Week 2/receipts_images/receipt_013.jpg",
    uploaded_at: new Date("2024-02-04T12:30:00Z")
  },
  {
    receipt_id: "receipt_014",
    user_id: 3,
    note: "Nature’s Basket groceries",
    image_path: "Week 2/receipts_images/receipt_014.jpg",
    uploaded_at: new Date("2024-02-06T15:15:00Z")
  },
  {
    receipt_id: "receipt_015",
    user_id: 1,
    note: "Auto fare to work",
    image_path: "Week 2/receipts_images/receipt_015.jpg",
    uploaded_at: new Date("2024-02-07T07:20:00Z")
  },
  {
    receipt_id: "receipt_016",
    user_id: 3,
    note: "Amazon monitor purchase",
    image_path: "Week 2/receipts_images/receipt_016.jpg",
    uploaded_at: new Date("2024-02-08T17:40:00Z")
  }
]);

// Indexes for faster lookup
db.receipts.createIndex({ receipt_id: 1 }, { unique: true });
db.receipts.createIndex({ user_id: 1 });
db.receipts.createIndex({ uploaded_at: -1 });
