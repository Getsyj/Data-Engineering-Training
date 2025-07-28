#1
def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

print("Factorial of 5:", factorial(5))


#2
students = [("Aarav", 80), ("Sanya", 65), ("Meera", 92), ("Rohan", 55)]

print("\nStudents scoring above 75:")
for name, score in students:
    if score > 75:
        print(name)

average = sum(score for _, score in students) / len(students)
print("Average Score:", average)


#3
class BankAccount:
    def __init__(self, holder_name, balance=0):
        self.holder_name = holder_name
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited: {amount}, New Balance: {self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient balance!")
        self.balance -= amount
        print(f"Withdrawn: {amount}, New Balance: {self.balance}")

#4
class SavingsAccount(BankAccount):
    def __init__(self, holder_name, balance=0, interest_rate=0.05):
        super().__init__(holder_name, balance)
        self.interest_rate = interest_rate

    def apply_interest(self):
        interest = self.balance * self.interest_rate
        self.balance += interest
        print(f"Interest Applied: {interest}, New Balance: {self.balance}")

# Example
print("\n--- Bank Account Example ---")
acc = SavingsAccount("Aarav", 1000, 0.1)
acc.deposit(500)
acc.withdraw(300)
acc.apply_interest()



#5
import pandas as pd

orders = pd.DataFrame({
    'OrderID': [101, 102, 103, 104, 105],
    'CustomerName': ['Aarav', 'Sanya', 'Rohan', None, 'Meera'],
    'Item': ['Notebook', 'Pen', None, 'Marker', 'Eraser'],
    'Quantity': [2, 5, 3, 4, None],
    'Price': [50, 20, 25, None, 10]
})

# Fill missing values
orders['CustomerName'].fillna('Unknown', inplace=True)
orders['Quantity'].fillna(0, inplace=True)
orders['Price'].fillna(0, inplace=True)

# Add TotalAmount column
orders['TotalAmount'] = orders['Quantity'] * orders['Price']

# Save cleaned data
orders.to_csv("orders_cleaned.csv", index=False)
print("\nCleaned orders saved to orders_cleaned.csv")



#6
import json


inventory = [
    {"item": "Pen", "stock": 120},
    {"item": "Notebook", "stock": 75},
    {"item": "Eraser", "stock": 0}
]

# Add status
for product in inventory:
    product['status'] = "In Stock" if product['stock'] > 0 else "Out of Stock"

# Save updated JSON
with open("inventory_updated.json", "w") as f:
    json.dump(inventory, f, indent=4)

print("Updated inventory saved to inventory_updated.json")


#7
import numpy as np

# Generate 20 random scores between 35 and 100
scores = np.random.randint(35, 101, size=20)

# Count students scoring above 75
above_75 = np.sum(scores > 75)

# Calculate mean and std deviation
mean_score = np.mean(scores)
std_dev = np.std(scores)

print("\nScores:", scores)
print("Students scoring above 75:", above_75)
print("Mean:", mean_score)
print("Standard Deviation:", std_dev)

# Save scores
scores_df = pd.DataFrame({'Scores': scores})
scores_df.to_csv("scores.csv", index=False)
print("Scores saved to scores.csv")
