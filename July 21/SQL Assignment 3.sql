CREATE DATABASE BookDB;
USE BookDB;

-- Table: books
CREATE TABLE books (
    book_id INT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    genre VARCHAR(50),
    price DECIMAL(8,2)
);

-- Table: customers
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    city VARCHAR(50)
);

-- Table: orders
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    book_id INT,
    order_date DATE,
    quantity INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);


-- INSERT SAMPLE DATA

-- Insert books 
INSERT INTO books VALUES
(1, 'The Silent Patient', 'Alex Michaelides', 'Thriller', 650.00),
(2, 'Atomic Habits', 'James Clear', 'Self-help', 499.00),
(3, 'Sapiens', 'Yuval Noah Harari', 'History', 700.00),
(4, 'The Alchemist', 'Paulo Coelho', 'Fiction', 350.00),
(5, 'Deep Work', 'Cal Newport', 'Productivity', 800.00),
(6, 'Ikigai', 'Francesc Miralles', 'Philosophy', 550.00);

-- Insert customers 
INSERT INTO customers VALUES
(1, 'Amit Sharma', 'amit@example.com', 'Delhi'),
(2, 'Neha Reddy', 'neha@example.com', 'Hyderabad'),
(3, 'Faizan Ali', 'faizan@example.com', 'Mumbai'),
(4, 'Divya Mehta', 'divya@example.com', 'Hyderabad'),
(5, 'Ravi Verma', 'ravi@example.com', 'Chennai');

-- Insert orders 
INSERT INTO orders VALUES
(1, 1, 1, '2023-01-05', 2),   -- Thriller
(2, 2, 3, '2023-03-10', 1),   -- History
(3, 3, 5, '2023-02-15', 3),   -- Productivity
(4, 4, 2, '2022-12-20', 1),   -- Self-help
(5, 5, 1, '2023-04-01', 1),   -- Thriller
(6, 2, 4, '2023-05-08', 2),   -- Fiction
(7, 2, 1, '2023-06-01', 1);   -- Thriller 


-- QUERIES

-- 1. List all books with price above 500
SELECT * FROM books
WHERE price > 500;

-- 2. Show all customers from the city of 'Hyderabad'
SELECT * FROM customers
WHERE city = 'Hyderabad';

-- 3. Find all orders placed after '2023-01-01'
SELECT * FROM orders
WHERE order_date > '2023-01-01';

-- 4. Show customer names along with book titles they purchased
SELECT c.name AS customer_name, b.title AS book_title
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN books b ON o.book_id = b.book_id;

-- 5. List each genre and total number of books sold in that genre
SELECT b.genre, SUM(o.quantity) AS total_sold
FROM orders o
JOIN books b ON o.book_id = b.book_id
GROUP BY b.genre;

-- 6. Find the total sales amount  for each book
SELECT 
    b.title,
    SUM(b.price * o.quantity) AS total_sales
FROM orders o
JOIN books b ON o.book_id = b.book_id
GROUP BY b.title;

-- 7. Show the customer who placed the highest number of orders
SELECT c.name, COUNT(o.order_id) AS total_orders
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.name
ORDER BY total_orders DESC
LIMIT 1;

-- 8. Display average price of books by genre
SELECT genre, AVG(price) AS avg_price
FROM books
GROUP BY genre;


-- 9. List all books that have not been ordered
SELECT * FROM books
WHERE book_id NOT IN (SELECT DISTINCT book_id FROM orders);

-- 10. Show the name of the customer who has spent the most in total
SELECT c.name, SUM(b.price * o.quantity) AS total_spent
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN books b ON o.book_id = b.book_id
GROUP BY c.name
ORDER BY total_spent DESC
LIMIT 1;
