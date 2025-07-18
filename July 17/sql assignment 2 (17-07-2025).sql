use analytics_practice;

CREATE TABLE dept(
dept_id INT PRIMARY KEY,
dept_name VARCHAR(100));

INSERT INTO dept VALUES
(1,"Human Reseources"),
(2, "Engineering"),
(3, "Marketing");

CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100),
    dept_id INT,
    salary INT);

INSERT INTO employees VALUES
(101, 'Amit Sharma', 1, 36000),
(102, 'Neha Reddy', 2, 45000),
(103, 'Faizan Ali', 2, 48000),
(104, 'Divya Mehta', 3, 35000),
(105, 'Ravi Verma', NULL, 23000);

SELECT e.emp_name, d.dept_name
FROM dept d
LEFT JOIN employees e ON d.dept_id=e.dept_id;

SELECT e.emp_name
FROM employees e
WHERE e.dept_id = NULL;

SELECT d.dept_name, COUNT(e.emp_id) AS total_emp
FROM dept d
LEFT JOIN employees e ON d.dept_id=e.dept_id
GROUP BY d.dept_name;

SELECT d.dept_name
FROM dept d
LEFT JOIN employees e ON d.dept_id=e.dept_id
WHERE emp_id IS NULL;

SELECT e.emp_name, d.dept_name, e.salary 
FROM employees e
JOIN dept d ON e.dept_id=d.dept_id
WHERE e.salary > 40000;
