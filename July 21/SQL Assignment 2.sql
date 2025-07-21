CREATE DATABASE EduDB;
USE EduDB;

-- Create students table
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    gender VARCHAR(10),
    department_id INT
);

-- Create departments table
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100),
    head_of_department VARCHAR(100)
);

-- Create courses table
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    department_id INT,
    credit_hours INT
);


-- Insert into students
INSERT INTO students VALUES
(1, 'Amit Sharma', 20, 'Male', 1),
(2, 'Neha Reddy', 22, 'Female', 2),
(3, 'Faizan Ali', 21, 'Male', 1),
(4, 'Divya Mehta', 23, 'Female', 3),
(5, 'Ravi Verma', 22, 'Male', 2);

-- Insert into departments
INSERT INTO departments VALUES
(1, 'Computer Science', 'Dr. Rao'),
(2, 'Electronics', 'Dr. Iyer'),
(3, 'Mechanical', 'Dr. Khan');

-- Insert into courses
INSERT INTO courses VALUES
(101, 'Data Structures', 1, 4),
(102, 'Circuits', 2, 3),
(103, 'Thermodynamics', 3, 4),
(104, 'Algorithms', 1, 3),
(105, 'Microcontrollers', 2, 2);


-- SECTION A: BASIC QUERIES


-- 1. List all students with name, age, and gender
SELECT name, age, gender FROM students;

-- 2. Show names of female students only
SELECT name FROM students
WHERE gender = 'Female';

-- 3. Display all courses offered by the Electronics department
SELECT c.* 
FROM courses c
JOIN departments d ON c.department_id = d.department_id
WHERE d.department_name = 'Electronics';

-- 4. Show the department name and head for department_id = 1
SELECT department_name, head_of_department
FROM departments
WHERE department_id = 1;

-- 5. Display students older than 21 years
SELECT * FROM students
WHERE age > 21;


-- SECTION B: JOINS & AGGREGATIONS


-- 6. Show student names along with their department names
SELECT s.name, d.department_name
FROM students s
JOIN departments d ON s.department_id = d.department_id;

-- 7. List all departments with number of students in each
SELECT d.department_name, COUNT(s.student_id) AS student_count
FROM departments d
LEFT JOIN students s ON d.department_id = s.department_id
GROUP BY d.department_name;

-- 8. Find the average age of students per department
SELECT d.department_name, AVG(s.age) AS avg_age
FROM students s
JOIN departments d ON s.department_id = d.department_id
GROUP BY d.department_name;

-- 9. Show all courses with their respective department names
SELECT c.course_name, d.department_name
FROM courses c
JOIN departments d ON c.department_id = d.department_id;

-- 10. List departments that have no students enrolled
SELECT d.department_name
FROM departments d
LEFT JOIN students s ON d.department_id = s.department_id
WHERE s.student_id IS NULL;

-- 11. Show the department that has the highest number of courses
SELECT d.department_name
FROM departments d
JOIN courses c ON d.department_id = c.department_id
GROUP BY d.department_name
ORDER BY COUNT(c.course_id) DESC
LIMIT 1;


-- SECTION C: SUBQUERIES & ADVANCED FILTERS


-- 12. Students whose age is above the average age
SELECT name
FROM students
WHERE age > (SELECT AVG(age) FROM students);

-- 13. Departments that offer courses with more than 3 credit hours
SELECT DISTINCT d.department_name
FROM departments d
JOIN courses c ON d.department_id = c.department_id
WHERE c.credit_hours > 3;

-- 14. Students in the department with the fewest courses
SELECT name
FROM students
WHERE department_id = (
    SELECT department_id
    FROM courses
    GROUP BY department_id
    ORDER BY COUNT(*) ASC
    LIMIT 1
);

-- 15. Students in departments where HOD name contains 'Dr.'
SELECT s.name
FROM students s
JOIN departments d ON s.department_id = d.department_id
WHERE d.head_of_department LIKE '%Dr.%';

-- 16. Find the second oldest student
SELECT name, age
FROM students
ORDER BY age DESC
LIMIT 1 OFFSET 1;

-- 17. Courses from departments with more than 2 students
SELECT c.course_name
FROM courses c
WHERE c.department_id IN (
    SELECT department_id
    FROM students
    GROUP BY department_id
    HAVING COUNT(*) > 2
);
