import pandas as pd
import mysql.connector

# 1. Load the expenses CSV
df = pd.read_csv("Week 2/expenses_feb.csv")

# 2. Clean/validate data
df['expense_date'] = pd.to_datetime(df['expense_date'], errors='coerce')
df = df.dropna(subset=['user_id', 'category_id', 'amount', 'expense_date'])

# 3. Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0805Fbpfk", 
    database="expense_monitoring"
)
cursor = conn.cursor()

# 4. Insert data into MySQL
for _, row in df.iterrows():
    query = """
        INSERT INTO expenses (user_id, category_id, amount, description, expense_date, receipt_id)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    values = (
        int(row['user_id']),
        int(row['category_id']),
        float(row['amount']),
        row['description'],
        row['expense_date'].date(),
        row['receipt_id']
    )
    cursor.execute(query, values)

conn.commit()
cursor.close()
conn.close()

print("Expenses data inserted into MySQL successfully.")
