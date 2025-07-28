# 1
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# 2
s = input("Enter a string: ")

reversed_s = s[::-1]
print("Reversed string:", reversed_s)

if s == reversed_s:
    print("It's a palindrome.")
else:
    print("Not a palindrome.")

# 3
numbers = [4, 1, 2, 4, 3, 5, 2, 5]

unique_numbers = list(set(numbers))
unique_numbers.sort()
print("Sorted without duplicates:", unique_numbers)

if len(unique_numbers) >= 2:
    print("Second largest:", unique_numbers[-2])
else:
    print("Not enough unique numbers.")


# 4
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display(self):
        print(f"Name: {self.name} | Age: {self.age}")

class Employee(Person):
    def __init__(self, name, age, employee_id, department):
        super().__init__(name, age)
        self.employee_id = employee_id
        self.department = department

    def display(self):
        print(f"Name: {self.name} | Age: {self.age} | Employee ID: {self.employee_id} | Department: {self.department}")

e = Employee("Amit", 30, "E001", "IT")
e.display()

#5
class Vehicle:
    def drive(self):
        print("Vehicle is being driven.")

class Car(Vehicle):
    def drive(self):
        print("Car is zooming on the road!")

v = Vehicle()
v.drive()

c = Car()
c.drive()


#6
import pandas as pd
import numpy as np

students = pd.read_csv("students.csv")

# Fill missing Age with average
avg_age = students["Age"].mean(skipna=True)
students["Age"].fillna(round(avg_age), inplace=True)

# Fill missing Score with 0
students["Score"].fillna(0, inplace=True)

students.to_csv("students_cleaned.csv", index=False)

# 7
students_cleaned = pd.read_csv("students_cleaned.csv")
students_cleaned.to_json("students.json", orient="records", indent=2)


# 8
students = pd.read_csv("students_cleaned.csv")

def get_status(score):
    if score >= 85:
        return "Distinction"
    elif 60 <= score < 85:
        return "Passed"
    else:
        return "Failed"

students['Status'] = students['Score'].apply(get_status)
students['Tax_ID'] = students['ID'].apply(lambda x: f"TAX-{x}")

students.to_csv("students_cleaned.csv", index=False)
print(students)

