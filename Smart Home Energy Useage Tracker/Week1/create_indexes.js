
use smart_home_energy;

// sample energy usage logs
db.sensor_logs.insertMany([
  {
    device_id: 1,
    timestamp: new Date("2025-07-19T08:00:00Z"),
    energy_kwh: 1.5,
    room: "Living Room"
  },
  {
    device_id: 2,
    timestamp: new Date("2025-07-19T08:05:00Z"),
    energy_kwh: 0.9,
    room: "Kitchen"
  },
  {
    device_id: 3,
    timestamp: new Date("2025-07-19T08:10:00Z"),
    energy_kwh: 0.4,
    room: "Living Room"
  },
  {
    device_id: 4,
    timestamp: new Date("2025-07-19T08:15:00Z"),
    energy_kwh: 2.3,
    room: "Bedroom"
  },
  {
    device_id: 1,
    timestamp: new Date("2025-07-18T08:00:00Z"),
    energy_kwh: 1.8,
    room: "Living Room"
  },
  {
    device_id: 3,
    timestamp: new Date("2025-07-18T08:10:00Z"),
    energy_kwh: 0.5,
    room: "Living Room"
  }
]);

// Create indexes for efficient querying
db.sensor_logs.createIndex({ device_id: 1 });
db.sensor_logs.createIndex({ timestamp: 1 });
