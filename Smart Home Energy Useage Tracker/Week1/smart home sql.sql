CREATE DATABASE smart_home_energy;
USE smart_home_energy;

CREATE TABLE rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_name VARCHAR(100) NOT NULL
);

CREATE TABLE devices (
    device_id INT PRIMARY KEY AUTO_INCREMENT,
    device_name VARCHAR(100) NOT NULL,
    room_id INT,
    status ENUM('ON', 'OFF') DEFAULT 'OFF',
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

CREATE TABLE energy_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    device_id INT,
    timestamp DATETIME NOT NULL,
    energy_kwh DECIMAL(10, 3),
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
);

INSERT INTO rooms (room_name) VALUES 
('Living Room'), 
('Kitchen'), 
('Bedroom');

INSERT INTO devices (device_name, room_id, status) VALUES 
('AC', 1, 'OFF'), 
('Fridge', 2, 'ON'),
('TV', 1, 'ON'),
('Heater', 3, 'OFF');

INSERT INTO energy_logs (device_id, timestamp, energy_kwh) VALUES 
(1, NOW(), 1.5),
(2, NOW(), 0.8),
(3, NOW(), 0.4),
(4, NOW(), 2.3),
(1, NOW() - INTERVAL 1 DAY, 1.8),
(3, NOW() - INTERVAL 1 DAY, 0.5);

DELIMITER $$

CREATE PROCEDURE GetRoomEnergyUsage(IN usage_date DATE)
BEGIN
    SELECT r.room_name, DATE(e.timestamp) AS usage_day, SUM(e.energy_kwh) AS total_energy_kwh
    FROM energy_logs e
    JOIN devices d ON e.device_id = d.device_id
    JOIN rooms r ON d.room_id = r.room_id
    WHERE DATE(e.timestamp) = usage_date
    GROUP BY r.room_name, usage_day;
END $$

DELIMITER ;
