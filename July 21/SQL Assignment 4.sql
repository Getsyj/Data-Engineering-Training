CREATE DATABASE movie_rentals_db;
USE movie_rentals_db;


CREATE TABLE movies (
  movie_id INT PRIMARY KEY,
  title VARCHAR(100),
  genre VARCHAR(50),
  release_year INT,
  rental_rate DECIMAL(5,2)
);

CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  city VARCHAR(50)
);

CREATE TABLE rentals (
  rental_id INT PRIMARY KEY,
  customer_id INT,
  movie_id INT,
  rental_date DATE,
  return_date DATE,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);


-- Sample Data

-- Movies 
INSERT INTO movies VALUES
(1, 'Inception', 'Sci-Fi', 2010, 150.00),
(2, 'The Batman', 'Action', 2022, 180.00),
(3, 'Coco', 'Animation', 2017, 100.00),
(4, 'Joker', 'Drama', 2019, 120.00),
(5, 'Interstellar', 'Sci-Fi', 2014, 200.00);

-- Customers 
INSERT INTO customers VALUES
(1, 'Amit Sharma', 'amit.sharma@example.com', 'Delhi'),
(2, 'Neha Reddy', 'neha.reddy@example.com', 'Hyderabad'),
(3, 'Rahul Verma', 'rahul.verma@example.com', 'Bangalore'),
(4, 'Sara Khan', 'sara.khan@example.com', 'Mumbai'),
(5, 'Vikram Das', 'vikram.das@example.com', 'Bangalore');

-- Rentals 
INSERT INTO rentals VALUES
(1, 1, 1, '2024-01-05', '2024-01-10'),
(2, 1, 2, '2024-02-01', '2024-02-05'),
(3, 2, 3, '2024-03-12', '2024-03-18'),
(4, 3, 2, '2024-04-01', '2024-04-06'),
(5, 3, 5, '2024-04-10', NULL),  
(6, 4, 4, '2024-05-01', '2024-05-04'),
(7, 1, 1, '2024-06-15', '2024-06-20'), 
(8, 2, 5, '2024-07-01', NULL); 

--  Queries

-- 1. Retrieve all movies rented by a customer named 'Amit Sharma'
SELECT m.*
FROM rentals r
JOIN customers c ON r.customer_id = c.customer_id
JOIN movies m ON r.movie_id = m.movie_id
WHERE c.name = 'Amit Sharma';

-- 2. Show the details of customers from 'Bangalore'
SELECT * FROM customers WHERE city = 'Bangalore';

-- 3. List all movies released after the year 2020
SELECT * FROM movies WHERE release_year > 2020;

-- 4. Count how many movies each customer has rented
SELECT c.name, COUNT(r.rental_id) AS rentals_count
FROM customers c
LEFT JOIN rentals r ON c.customer_id = r.customer_id
GROUP BY c.name;

-- 5. Find the most rented movie title
SELECT m.title, COUNT(*) AS rental_count
FROM rentals r
JOIN movies m ON r.movie_id = m.movie_id
GROUP BY m.title
ORDER BY rental_count DESC
LIMIT 1;

-- 6. Calculate total revenue earned from all rentals
SELECT SUM(m.rental_rate) AS total_revenue
FROM rentals r
JOIN movies m ON r.movie_id = m.movie_id;

-- 7. List all customers who have never rented a movie
SELECT c.*
FROM customers c
LEFT JOIN rentals r ON c.customer_id = r.customer_id
WHERE r.rental_id IS NULL;

-- 8. Show each genre and the total revenue from that genre
SELECT m.genre, SUM(m.rental_rate) AS revenue
FROM rentals r
JOIN movies m ON r.movie_id = m.movie_id
GROUP BY m.genre;

-- 9. Find the customer who spent the most money on rentals
SELECT c.name, SUM(m.rental_rate) AS total_spent
FROM rentals r
JOIN customers c ON r.customer_id = c.customer_id
JOIN movies m ON r.movie_id = m.movie_id
GROUP BY c.name
ORDER BY total_spent DESC
LIMIT 1;

-- 10. Display movie titles that were rented and not yet returned
SELECT DISTINCT m.title
FROM rentals r
JOIN movies m ON r.movie_id = m.movie_id
WHERE r.return_date IS NULL;
