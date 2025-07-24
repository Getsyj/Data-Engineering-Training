-- Create and use DB
CREATE DATABASE travel_planner;
USE travel_planner;

-- Table Creation

CREATE TABLE Destinations (
    destination_id INT PRIMARY KEY AUTO_INCREMENT,
    city VARCHAR(50),
    country VARCHAR(50),
    category VARCHAR(30),
    avg_cost_per_day INT
);

CREATE TABLE Trips (
    trip_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT,
    traveler_name VARCHAR(50),
    start_date DATE,
    end_date DATE,
    budget INT,
    FOREIGN KEY (destination_id) REFERENCES Destinations(destination_id)
);

--  destinations 
INSERT INTO Destinations (city, country, category, avg_cost_per_day) VALUES
('Goa', 'India', 'Beach', 2500),
('Jaipur', 'India', 'Historical', 2200),
('Paris', 'France', 'Historical', 4500),
('Sydney', 'Australia', 'Beach', 4000),
('Banff', 'Canada', 'Nature', 3500),
('Queenstown', 'New Zealand', 'Adventure', 3700),
('Machu Picchu', 'Peru', 'Historical', 3800);

--  trips 
INSERT INTO Trips (destination_id, traveler_name, start_date, end_date, budget) VALUES
(1, 'Alice', '2024-12-01', '2024-12-08', 25000),
(2, 'Bob', '2025-01-10', '2025-01-18', 22000),
(3, 'Charlie', '2025-02-15', '2025-02-20', 30000),
(4, 'David', '2025-03-05', '2025-03-15', 45000),
(5, 'Eva', '2025-04-01', '2025-04-07', 20000),
(6, 'Frank', '2025-05-10', '2025-05-20', 40000),
(1, 'Grace', '2025-06-01', '2025-06-10', 30000),
(2, 'Hannah', '2025-07-05', '2025-07-12', 18000),
(4, 'Ivan', '2025-08-01', '2025-08-09', 36000),
(5, 'Jack', '2025-09-15', '2025-09-22', 25000),
(3, 'Alice', '2025-10-01', '2025-10-08', 32000);

-- 1
SELECT * FROM Trips
WHERE destination_id IN (
    SELECT destination_id FROM Destinations WHERE country = 'India'
);

-- 2
SELECT * FROM Destinations
WHERE avg_cost_per_day < 3000;

-- 3
SELECT 
    trip_id,
    traveler_name,
    DATEDIFF(end_date, start_date) + 1 AS trip_duration_days
FROM Trips;

-- 4
SELECT * FROM Trips
WHERE DATEDIFF(end_date, start_date) + 1 > 7;

-- 5
SELECT 
    t.traveler_name,
    d.city,
    (DATEDIFF(t.end_date, t.start_date) + 1) * d.avg_cost_per_day AS total_trip_cost
FROM Trips t
JOIN Destinations d ON t.destination_id = d.destination_id;

-- 6
SELECT 
    d.country,
    COUNT(*) AS total_trips
FROM Trips t
JOIN Destinations d ON t.destination_id = d.destination_id
GROUP BY d.country;

-- 7
SELECT 
    d.country,
    AVG(t.budget) AS average_budget
FROM Trips t
JOIN Destinations d ON t.destination_id = d.destination_id
GROUP BY d.country;

-- 8
SELECT 
    traveler_name,
    COUNT(*) AS trip_count
FROM Trips
GROUP BY traveler_name
ORDER BY trip_count DESC
LIMIT 1;

-- 9
SELECT * FROM Destinations
WHERE destination_id NOT IN (
    SELECT DISTINCT destination_id FROM Trips
);

-- 10
SELECT 
    t.*,
    d.city,
    d.avg_cost_per_day,
    (DATEDIFF(t.end_date, t.start_date) + 1) AS days,
    t.budget / (DATEDIFF(t.end_date, t.start_date) + 1) AS cost_per_day
FROM Trips t
JOIN Destinations d ON t.destination_id = d.destination_id
ORDER BY cost_per_day DESC
LIMIT 1;

-- 11
UPDATE Trips
SET 
    end_date = DATE_ADD(end_date, INTERVAL 3 DAY),
    budget = budget + (3 * (SELECT avg_cost_per_day FROM Destinations WHERE destination_id = Trips.destination_id))
WHERE trip_id = 1;

-- 12
DELETE FROM Trips
WHERE end_date < '2023-01-01';
