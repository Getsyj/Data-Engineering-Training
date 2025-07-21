use("expense_monitoring");

db.receipts.drop();
db.createCollection("receipts");

db.receipts.insertMany([
  {
    receipt_id: "receipt_001",
    user_id: 1,
    note: "Grocery shopping at Walmart",
    image_url: "https://example.com/receipts/001.jpg",
    uploaded_at: new Date("2024-01-15T10:00:00Z")
  },
  {
    receipt_id: "receipt_002",
    user_id: 1,
    note: "Gas station fill-up",
    image_url: "https://example.com/receipts/002.jpg",
    uploaded_at: new Date("2024-01-16T12:00:00Z")
  },
  {
    receipt_id: "receipt_003",
    user_id: 2,
    note: "Dinner at restaurant",
    image_url: "https://example.com/receipts/003.jpg",
    uploaded_at: new Date("2024-01-18T20:00:00Z")
  }
]);

db.receipts.createIndex({ user_id: 1 });
db.receipts.createIndex({ uploaded_at: -1 });
db.receipts.createIndex({ receipt_id: 1 }, { unique: true });
