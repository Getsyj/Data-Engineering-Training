import pandas as pd
import numpy as np

# energy logs
df = pd.read_csv("energyusage.csv")

#Clean and convert types
df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
df['energy_kwh'] = pd.to_numeric(df['energy_kwh'], errors='coerce')
df['room'] = df['room'].astype(str)

#Drop rows with missing or bad data
df_cleaned = df.dropna(subset=['timestamp', 'energy_kwh', 'room', 'device_id'])

#NumPy calculations per device
device_summary = df_cleaned.groupby('device_id')['energy_kwh'].agg([np.sum, np.mean]).reset_index()

#Pandas room-level summaries
room_summary = df_cleaned.groupby('room')['energy_kwh'].sum().reset_index()

#Save results
df_cleaned.to_csv("cleaned_energyusage.csv", index=False)
device_summary.to_csv("device_summary.csv", index=False)
room_summary.to_csv("room_summary.csv", index=False)

#Print to console
print("Device Summary:\n", device_summary)
print("\nRoom Summary:\n", room_summary)
