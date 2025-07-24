use ecommerce_store;

// Insert Collections

// Books
db.books.insertMany([
  { book_id: 201, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", copies: 10 },
  { book_id: 202, title: "Atomic Habits", author: "James Clear", genre: "Self-Help", copies: 5 },
  { book_id: 203, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", copies: 7 },
  { book_id: 204, title: "The Lean Startup", author: "Eric Ries", genre: "Business", copies: 3 },
  { book_id: 205, title: "Deep Work", author: "Cal Newport", genre: "Productivity", copies: 4 }
]);

// Members
db.members.insertMany([
  { member_id: 101, name: "Ayesha Khan", joined_on: new Date("2024-01-15") },
  { member_id: 102, name: "Rahul Verma", joined_on: new Date("2024-03-12") },
  { member_id: 103, name: "Nikita Rao", joined_on: new Date("2024-04-10") }
]);

// Borrowed
db.borrowed.insertMany([
  { borrow_id: 1, member_id: 101, book_id: 201, date: new Date("2024-06-01"), returned: true },
  { borrow_id: 2, member_id: 101, book_id: 203, date: new Date("2024-06-15"), returned: false },
  { borrow_id: 3, member_id: 102, book_id: 202, date: new Date("2024-06-20"), returned: false },
  { borrow_id: 4, member_id: 103, book_id: 204, date: new Date("2024-06-22"), returned: true }
]);

// 1
db.books.find({ genre: "Self-Help" });

// 2
db.members.find({ joined_on: { $gt: new Date("2024-03-01") } });

// 3
db.borrowed.find({ returned: false });

// 4
db.books.find({ copies: { $lt: 5 } });

// 5
db.books.find({ author: "Cal Newport" });

// 6
db.borrowed.aggregate([
  { $lookup: { from: "books", localField: "book_id", foreignField: "book_id", as: "book_info" } },
  { $lookup: { from: "members", localField: "member_id", foreignField: "member_id", as: "member_info" } },
  { $unwind: "$book_info" },
  { $unwind: "$member_info" },
  { $project: { _id: 0, borrow_id: 1, book_title: "$book_info.title", member_name: "$member_info.name" } }
]);

// 7
db.borrowed.aggregate([
  { $lookup: { from: "books", localField: "book_id", foreignField: "book_id", as: "book_info" } },
  { $unwind: "$book_info" },
  { $match: { "book_info.title": "Sapiens" } },
  { $lookup: { from: "members", localField: "member_id", foreignField: "member_id", as: "member_info" } },
  { $unwind: "$member_info" },
  { $project: { _id: 0, member_name: "$member_info.name" } }
]);

// 8
db.members.aggregate([
  { $lookup: { from: "borrowed", localField: "member_id", foreignField: "member_id", as: "borrowed_books" } }
]);

// 9
db.borrowed.aggregate([
  { $match: { returned: false } },
  { $lookup: { from: "members", localField: "member_id", foreignField: "member_id", as: "member_info" } },
  { $unwind: "$member_info" },
  { $group: { _id: "$member_info.name" } }
]);

// 10
db.borrowed.aggregate([
  { $group: { _id: "$book_id", borrow_count: { $sum: 1 } } },
  { $lookup: { from: "books", localField: "_id", foreignField: "book_id", as: "book_info" } },
  { $unwind: "$book_info" },
  { $project: { book_title: "$book_info.title", borrow_count: 1 } }
]);

// 11
db.borrowed.aggregate([
  { $group: { _id: "$member_id", books_borrowed: { $sum: 1 } } },
  { $lookup: { from: "members", localField: "_id", foreignField: "member_id", as: "member_info" } },
  { $unwind: "$member_info" },
  { $project: { member_name: "$member_info.name", books_borrowed: 1 } }
]);

// 12
db.books.aggregate([
  { $group: { _id: "$genre", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 13
db.borrowed.aggregate([
  { $group: { _id: "$book_id", borrow_count: { $sum: 1 } } },
  { $sort: { borrow_count: -1 } },
  { $limit: 2 },
  { $lookup: { from: "books", localField: "_id", foreignField: "book_id", as: "book_info" } },
  { $unwind: "$book_info" },
  { $project: { book_title: "$book_info.title", borrow_count: 1 } }
]);

// 14
db.books.aggregate([
  { $group: { _id: "$genre", avg_copies: { $avg: "$copies" } } }
]);

// 15
db.borrowed.countDocuments({ returned: false });

// 16
db.members.insertOne({ member_id: 104, name: "Siddharth Das", joined_on: new Date("2024-07-01") });
db.members.aggregate([
  { $lookup: { from: "borrowed", localField: "member_id", foreignField: "member_id", as: "borrow_info" } },
  { $match: { borrow_info: { $size: 0 } } },
  { $project: { name: 1 } }
]);

// 17
db.books.find({
  book_id: { $nin: db.borrowed.distinct("book_id") }
});

// 18
db.borrowed.aggregate([
  { $group: { _id: "$member_id", borrow_count: { $sum: 1 } } },
  { $match: { borrow_count: { $gt: 1 } } },
  { $lookup: { from: "members", localField: "_id", foreignField: "member_id", as: "member_info" } },
  { $unwind: "$member_info" },
  { $project: { member_name: "$member_info.name", borrow_count: 1 } }
]);

// 19
db.borrowed.aggregate([
  { $group: { _id: { month: { $month: "$date" }, year: { $year: "$date" } }, borrow_count: { $sum: 1 } } },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
]);

// 20
db.borrowed.aggregate([
  { $lookup: { from: "books", localField: "book_id", foreignField: "book_id", as: "book_info" } },
  { $unwind: "$book_info" },
  { $match: { "book_info.copies": { $lt: 5 } } },
  { $project: { borrow_id: 1, book_title: "$book_info.title", copies_at_borrow: "$book_info.copies" } }
]);

// BONUS 1
// due_date for testing
db.borrowed.updateMany(
  {},
  { $set: { due_date: new Date("2024-06-10") } }
);

db.borrowed.find({
  due_date: { $lt: new Date() },
  returned: false
});

// BONUS 2
db.borrowed.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book_info"
    }
  },
  { $unwind: "$book_info" },
  {
    $group: {
      _id: "$book_info.genre",
      borrow_count: { $sum: 1 }
    }
  },
  { $project: { genre: "$_id", borrow_count: 1, _id: 0 } },
  { $sort: { borrow_count: -1 } }
]);
