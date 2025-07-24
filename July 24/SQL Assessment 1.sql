-- Create DB
CREATE DATABASE IF NOT EXISTS personal_fitness_tracker;
USE personal_fitness_tracker;

-- Table Creation

CREATE TABLE Exercises (
    exercise_id INT PRIMARY KEY AUTO_INCREMENT,
    exercise_name VARCHAR(50),
    category VARCHAR(30),
    calories_burn_per_min INT
);

CREATE TABLE WorkoutLog (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    exercise_id INT,
    date DATE,
    duration_min INT,
    mood VARCHAR(20),
    FOREIGN KEY (exercise_id) REFERENCES Exercises(exercise_id)
);


-- Insert Sample Data

INSERT INTO Exercises (exercise_name, category, calories_burn_per_min) VALUES
('Running', 'Cardio', 12),
('Cycling', 'Cardio', 10),
('Yoga', 'Flexibility', 4),
('Weight Lifting', 'Strength', 8),
('Jump Rope', 'Cardio', 11),
('Swimming', 'Cardio', 9);


-- Logs
INSERT INTO WorkoutLog (exercise_id, date, duration_min, mood) VALUES
(1, '2025-03-01', 30, 'Energized'),
(1, '2025-03-05', 45, 'Tired'),
(2, '2025-03-02', 40, 'Normal'),
(2, '2025-04-01', 35, 'Energized'),
(3, '2025-03-03', 60, 'Relaxed'),
(3, '2025-04-02', 45, 'Normal'),
(4, '2025-03-04', 50, 'Tired'),
(4, '2025-04-03', 30, 'Normal'),
(5, '2025-03-06', 25, 'Energized'),
(5, '2025-04-04', 40, 'Normal');


-- 1
SELECT * FROM Exercises
WHERE category = 'Cardio';

-- 2
SELECT * FROM WorkoutLog
WHERE MONTH(date) = 3 AND YEAR(date) = 2025;

-- 3
SELECT 
    log_id,
    duration_min,
    calories_burn_per_min,
    (duration_min * calories_burn_per_min) AS total_calories_burned
FROM WorkoutLog wl
JOIN Exercises e ON wl.exercise_id = e.exercise_id;

-- 4
SELECT 
    e.category,
    AVG(wl.duration_min) AS avg_duration
FROM WorkoutLog wl
JOIN Exercises e ON wl.exercise_id = e.exercise_id
GROUP BY e.category;

-- 5
SELECT 
    e.exercise_name,
    wl.date,
    wl.duration_min,
    (wl.duration_min * e.calories_burn_per_min) AS calories_burned
FROM WorkoutLog wl
JOIN Exercises e ON wl.exercise_id = e.exercise_id;

-- 6
SELECT 
    wl.date,
    SUM(wl.duration_min * e.calories_burn_per_min) AS total_calories_burned
FROM WorkoutLog wl
JOIN Exercises e ON wl.exercise_id = e.exercise_id
GROUP BY wl.date
ORDER BY wl.date;

-- 7
SELECT exercise_name
FROM Exercises
WHERE exercise_id = (
    SELECT wl.exercise_id
    FROM WorkoutLog wl
    JOIN Exercises e ON wl.exercise_id = e.exercise_id
    GROUP BY wl.exercise_id
    ORDER BY SUM(wl.duration_min * e.calories_burn_per_min) DESC
    LIMIT 1
);

-- 8
SELECT * FROM Exercises
WHERE exercise_id NOT IN (
    SELECT DISTINCT exercise_id FROM WorkoutLog
);

-- 9
SELECT * FROM WorkoutLog
WHERE mood = 'Tired' AND duration_min > 30;

-- 10
UPDATE WorkoutLog
SET mood = 'Normal'
WHERE log_id = 2; 

-- 11
UPDATE Exercises
SET calories_burn_per_min = 13
WHERE exercise_name = 'Running';

-- 12
DELETE FROM WorkoutLog
WHERE MONTH(date) = 2 AND YEAR(date) = 2024;

