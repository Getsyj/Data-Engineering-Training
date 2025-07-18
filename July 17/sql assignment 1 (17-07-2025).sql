
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock_quantity INT,
    added_date DATE
);

INSERT INTO products (product_id, product_name, category, price, stock_quantity, added_date) VALUES
(1, 'Laptop', 'Electronics', 1500.00, 12, '2024-05-10'),
(2, 'Sofa', 'Furniture', 800.00, 5, '2024-06-15'),
(3, 'Smartphone', 'Electronics', 1200.00, 8, '2024-03-20'),
(4, 'Shoes', 'Apparel', 150.00, 20, '2024-07-01'),
(5, 'Watch', 'Accessories', 250.00, 7, '2024-04-05');


SELECT * FROM products;


SELECT product_name, price FROM products;


SELECT * FROM products WHERE stock_quantity < 10;


SELECT * FROM products WHERE price BETWEEN 500 AND 2000;

SELECT * FROM products WHERE added_date > '2023-01-01';


SELECT * FROM products WHERE product_name LIKE 'S%';


SELECT * FROM products WHERE category IN ('Electronics', 'Furniture');


UPDATE products SET price = 1600.00 WHERE product_name = 'Laptop';


UPDATE products SET stock_quantity = stock_quantity + 5 WHERE category = 'Electronics';


DELETE FROM products WHERE product_id = 5;


DELETE FROM products WHERE stock_quantity = 0;
