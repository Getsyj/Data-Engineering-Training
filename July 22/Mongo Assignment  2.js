use("movieStreamingDB");

// Users
db.users.insertMany([
  { user_id: 1, name: "Arjun", email: "arjun@mail.com", country: "India" },
  { user_id: 2, name: "Maya", email: "maya@mail.com", country: "USA" },
  { user_id: 3, name: "Liam", email: "liam@mail.com", country: "UK" },
  { user_id: 4, name: "Aisha", email: "aisha@mail.com", country: "India" },
  { user_id: 5, name: "Carlos", email: "carlos@mail.com", country: "Mexico" }
]);

// Movies
db.movies.insertMany([
  { movie_id: 201, title: "Dream Beyond Code", genre: "Sci-Fi", release_year: 2022, duration: 120 },
  { movie_id: 202, title: "Mystic River", genre: "Thriller", release_year: 2019, duration: 105 },
  { movie_id: 203, title: "Laugh Out Loud", genre: "Comedy", release_year: 2021, duration: 90 },
  { movie_id: 204, title: "Space Odyssey", genre: "Sci-Fi", release_year: 2023, duration: 130 },
  { movie_id: 205, title: "The Love Code", genre: "Romance", release_year: 2020, duration: 110 },
  { movie_id: 206, title: "The Great Chef", genre: "Drama", release_year: 2022, duration: 100 }
]);

// Watch History
db.watch_history.insertMany([
  { watch_id: 1, user_id: 1, movie_id: 201, watched_on: ISODate("2023-06-01"), watch_time: 100 },
  { watch_id: 2, user_id: 2, movie_id: 202, watched_on: ISODate("2023-06-03"), watch_time: 105 },
  { watch_id: 3, user_id: 3, movie_id: 203, watched_on: ISODate("2023-06-05"), watch_time: 90 },
  { watch_id: 4, user_id: 1, movie_id: 204, watched_on: ISODate("2023-06-07"), watch_time: 130 },
  { watch_id: 5, user_id: 4, movie_id: 205, watched_on: ISODate("2023-06-10"), watch_time: 110 },
  { watch_id: 6, user_id: 5, movie_id: 206, watched_on: ISODate("2023-06-12"), watch_time: 100 },
  { watch_id: 7, user_id: 1, movie_id: 201, watched_on: ISODate("2023-06-15"), watch_time: 120 },
  { watch_id: 8, user_id: 2, movie_id: 203, watched_on: ISODate("2023-06-18"), watch_time: 90 }
]);

// 1
db.movies.find({ duration: { $gt: 100 } });

// 2
db.users.find({ country: "India" });

// 3
db.movies.find({ release_year: { $gt: 2020 } });

// 4
db.watch_history.aggregate([
  { $lookup: { from: "users", localField: "user_id", foreignField: "user_id", as: "user_info" }},
  { $lookup: { from: "movies", localField: "movie_id", foreignField: "movie_id", as: "movie_info" }},
  { $project: {
    watch_id: 1,
    watch_time: 1,
    "user_info.name": 1,
    "movie_info.title": 1
  }}
]);

// 5
db.watch_history.aggregate([
  { $lookup: { from: "movies", localField: "movie_id", foreignField: "movie_id", as: "movie_info" }},
  { $unwind: "$movie_info" },
  { $group: { _id: "$movie_info.genre", watch_count: { $sum: 1 } }}
]);

// 6
db.watch_history.aggregate([
  { $group: { _id: "$user_id", total_watch_time: { $sum: "$watch_time" }}},
  { $lookup: { from: "users", localField: "_id", foreignField: "user_id", as: "user_info" }},
  { $project: { user_name: { $arrayElemAt: ["$user_info.name", 0] }, total_watch_time: 1 }}
]);

// 7
db.watch_history.aggregate([
  { $group: { _id: "$movie_id", watch_count: { $sum: 1 }}},
  { $sort: { watch_count: -1 }},
  { $limit: 1 },
  { $lookup: { from: "movies", localField: "_id", foreignField: "movie_id", as: "movie_info" }},
  { $project: { movie_title: { $arrayElemAt: ["$movie_info.title", 0] }, watch_count: 1 }}
]);

// 8
db.watch_history.aggregate([
  { $group: { _id: { user_id: "$user_id", movie_id: "$movie_id" }}},
  { $group: { _id: "$_id.user_id", unique_movies: { $sum: 1 }}},
  { $match: { unique_movies: { $gt: 2 }}},
  { $lookup: { from: "users", localField: "_id", foreignField: "user_id", as: "user_info" }},
  { $project: { user_name: { $arrayElemAt: ["$user_info.name", 0] }, unique_movies: 1 }}
]);

// 9
db.watch_history.aggregate([
  { $group: { _id: { user_id: "$user_id", movie_id: "$movie_id" }, count: { $sum: 1 }}},
  { $match: { count: { $gt: 1 }}},
  { $lookup: { from: "users", localField: "_id.user_id", foreignField: "user_id", as: "user_info" }},
  { $lookup: { from: "movies", localField: "_id.movie_id", foreignField: "movie_id", as: "movie_info" }},
  { $project: {
    user_name: { $arrayElemAt: ["$user_info.name", 0] },
    movie_title: { $arrayElemAt: ["$movie_info.title", 0] },
    times_watched: "$count"
  }}
]);

// 10
db.watch_history.aggregate([
  { $lookup: { from: "movies", localField: "movie_id", foreignField: "movie_id", as: "movie_info" }},
  { $unwind: "$movie_info" },
  { $project: {
    watch_id: 1,
    user_id: 1,
    movie_id: 1,
    watch_time: 1,
    movie_title: "$movie_info.title",
    duration: "$movie_info.duration",
    percentage_watched: {
      $multiply: [
        { $divide: ["$watch_time", "$movie_info.duration"] },
        100
      ]
    }
  }}
]);
