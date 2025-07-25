-- Database
CREATE DATABASE IF NOT EXISTS expense_monitoring;
USE expense_monitoring;

-- Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses Table
CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    expense_date DATE NOT NULL,
    receipt_id VARCHAR(100), -- MongoDB reference
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE RESTRICT
);

-- Insert Categories
INSERT INTO categories (category_name, description) VALUES
('Food & Dining', 'Restaurants, groceries, food delivery'),
('Transportation', 'Gas, public transport, ride-sharing'),
('Housing', 'Rent, utilities, maintenance'),
('Entertainment', 'Movies, games, subscriptions'),
('Healthcare', 'Medical expenses, pharmacy'),
('Shopping', 'Clothing, electronics, misc purchases'),
('Education', 'Books, courses, tuition'),
('Travel', 'Hotels, flights, vacation expenses');

-- Insert Users
INSERT INTO users (username, email, full_name) VALUES
('rahul_kumar', 'rahul@email.com', 'Rahul Kumar'),
('priya_sharma', 'priya@email.com', 'Priya Sharma'),
('arjun_mehta', 'arjun@email.com', 'Arjun Mehta');

-- Insert Sample Expenses
INSERT INTO expenses (user_id, category_id, amount, description, expense_date, receipt_id) VALUES
(1, 1, 45.50, 'Grocery shopping at Big Bazaar', '2024-01-15', 'receipt_001'),
(1, 2, 25.00, 'Petrol from Indian Oil', '2024-01-16', 'receipt_002'),
(1, 4, 12.99, 'Netflix subscription', '2024-01-17', NULL),
(2, 1, 78.25, 'Dinner at Barbeque Nation', '2024-01-18', 'receipt_003'),
(2, 3, 12000.00, 'Monthly rent payment', '2024-01-01', 'receipt_004'),
(3, 6, 29999.00, 'New phone purchase from Croma', '2024-01-20', 'receipt_005'),
(1, 5, 1500.00, 'Doctor visit at Apollo', '2024-01-22', 'receipt_006'),
(2, 2, 355.00, 'Ola ride to railway station', '2024-01-25', 'receipt_007');

-- CREATE: Add new expense
DELIMITER //
CREATE PROCEDURE AddExpense(
    IN p_user_id INT,
    IN p_category_id INT,
    IN p_amount DECIMAL(10,2),
    IN p_description TEXT,
    IN p_expense_date DATE,
    IN p_receipt_id VARCHAR(100)
)
BEGIN
    INSERT INTO expenses (user_id, category_id, amount, description, expense_date, receipt_id)
    VALUES (p_user_id, p_category_id, p_amount, p_description, p_expense_date, p_receipt_id);
END //
DELIMITER ;

-- READ: Get all expenses for a user
DELIMITER //
CREATE PROCEDURE GetUserExpenses(IN p_user_id INT)
BEGIN
    SELECT 
        e.expense_id,
        e.amount,
        e.description,
        e.expense_date,
        c.category_name,
        e.receipt_id
    FROM expenses e
    JOIN categories c ON e.category_id = c.category_id
    WHERE e.user_id = p_user_id
    ORDER BY e.expense_date DESC;
END //
DELIMITER ;

-- UPDATE: Update expense
DELIMITER //
CREATE PROCEDURE UpdateExpense(
    IN p_expense_id INT,
    IN p_amount DECIMAL(10,2),
    IN p_description TEXT,
    IN p_category_id INT,
    IN p_expense_date DATE
)
BEGIN
    UPDATE expenses 
    SET amount = p_amount,
        description = p_description,
        category_id = p_category_id,
        expense_date = p_expense_date
    WHERE expense_id = p_expense_id;
END //
DELIMITER ;

-- DELETE: Remove expense
DELIMITER //
CREATE PROCEDURE DeleteExpense(IN p_expense_id INT)
BEGIN
    DELETE FROM expenses WHERE expense_id = p_expense_id;
END //
DELIMITER ;

-- Monthly total expenses per category
DELIMITER //
CREATE PROCEDURE GetMonthlyExpensesByCategory(
    IN p_user_id INT,
    IN p_year INT,
    IN p_month INT
)
BEGIN
    SELECT 
        c.category_name,
        SUM(e.amount) as total_amount
    FROM expenses e
    JOIN categories c ON e.category_id = c.category_id
    WHERE e.user_id = p_user_id
      AND YEAR(e.expense_date) = p_year
      AND MONTH(e.expense_date) = p_month
    GROUP BY c.category_id, c.category_name
    ORDER BY total_amount DESC;
END //
DELIMITER ;
