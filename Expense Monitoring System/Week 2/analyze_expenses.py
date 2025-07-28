import pandas as pd
import numpy as np

# Load CSV
df = pd.read_csv("Week 2/expenses_feb.csv")


# Clean/standardize
df['amount'] = df['amount'].replace('[\$,]', '', regex=True).astype(float)
df['expense_date'] = pd.to_datetime(df['expense_date'], errors='coerce')
df = df.dropna(subset=['user_id', 'category_id', 'amount', 'expense_date'])

# Add month column
df['month'] = df['expense_date'].dt.to_period('M')

# Monthly totals and averages
monthly_summary = df.groupby('month')['amount'].agg(['sum', 'mean', 'min', 'max', 'count'])
print("\nMonthly Summary (All Categories):\n")
print(monthly_summary)

# Category-wise breakdown per month
category_breakdown = df.groupby(['month', 'category_id'])['amount'].sum().unstack(fill_value=0)
print("\n Category-wise Breakdown per Month:\n")
print(category_breakdown)

# Optionally save results to CSV
monthly_summary.to_csv("monthly_summary.csv")
category_breakdown.to_csv("category_breakdown.csv")
