use("expense_monitoring");

// sample receipts
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
  },
  {
    receipt_id: "receipt_004",
    user_id: 2,
    note: "Monthly rent payment",
    image_url: "https://example.com/receipts/004.jpg",
    uploaded_at: new Date("2024-01-01T08:30:00Z")
  },
  {
    receipt_id: "receipt_005",
    user_id: 3,
    note: "Laptop from Croma store",
    image_url: "https://example.com/receipts/005.jpg",
    uploaded_at: new Date("2024-01-20T15:00:00Z")
  },
  {
    receipt_id: "receipt_006",
    user_id: 1,
    note: "Consultation at Apollo Clinic",
    image_url: "https://example.com/receipts/006.jpg",
    uploaded_at: new Date("2024-01-22T09:45:00Z")
  },
  {
    receipt_id: "receipt_007",
    user_id: 2,
    note: "Ola ride to Bangalore Airport",
    image_url: "https://example.com/receipts/007.jpg",
    uploaded_at: new Date("2024-01-25T06:30:00Z")
  },
  {
    receipt_id: "receipt_008",
    user_id: 1,
    note: "CCD Coffee with friends",
    image_url: "https://example.com/receipts/008.jpg",
    uploaded_at: new Date("2024-01-28T18:20:00Z")
  }
]);

// Create indexes
db.receipts.createIndex({ user_id: 1 });
db.receipts.createIndex({ uploaded_at: -1 });
db.receipts.createIndex({ receipt_id: 1 }, { unique: true });
