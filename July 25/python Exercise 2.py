# 1.BMI Cal
import math

weight = float(input("Enter your weight (kg): "))
height = float(input("Enter your height (m): "))

def calculate_bmi(weight, height):
    bmi = weight / math.pow(height, 2)
    if bmi < 18.5:
        print(f"BMI = {bmi:.2f} (Underweight)")
    elif 18.5 <= bmi < 25:
        print(f"BMI = {bmi:.2f} (Normal)")
    else:
        print(f"BMI = {bmi:.2f} (Overweight)")

calculate_bmi(weight, height)

# 2.Password Checker
while True:
    password = input("Enter a password: ")
    has_upper = any(char.isupper() for char in password)
    has_digit = any(char.isdigit() for char in password)
    has_special = any(char in "!@#$" for char in password)

    if has_upper and has_digit and has_special:
        print("Password is strong.")
        break
    else:
        print("Password must include at least 1 uppercase letter, 1 digit, and 1 special character (!@#$). Try again.")

# 3.Expense Cal
expenses = []
print("Enter your 7 daily expenses:")
for i in range(7):
    amount = float(input(f"Day {i+1} expense: "))
    expenses.append(amount)

def weekly_expense(expenses):
    print("Total spent:", sum(expenses))
    print("Average per day:", sum(expenses)/len(expenses))
    print("Highest spend in a day:", max(expenses))

weekly_expense(expenses)

# 4.Guess the Num
import random
secret = random.randint(1, 50)
chances = 5

print("Guess the number between 1 and 50. You have 5 chances.")
for i in range(chances):
    guess = int(input(f"Attempt {i+1}: "))
    if guess < secret:
        print("Too Low")
    elif guess > secret:
        print("Too High")
    else:
        print("Correct! You guessed it.")
        break
else:
    print("Out of chances. The number was:", secret)

# 5.Report Card
import datetime
name = input("Enter student name: ")
marks = []
for i in range(3):
    mark = float(input(f"Enter mark for subject {i+1}: "))
    marks.append(mark)

def get_total_and_average(marks):
    total = sum(marks)
    avg = total / len(marks)
    return total, avg

def get_grade(avg):
    if avg >= 75:
        return "A"
    elif avg >= 50:
        return "B"
    else:
        return "C"

total, avg = get_total_and_average(marks)
grade = get_grade(avg)
print("\nReport Card")
print("Name:", name)
print("Total:", total)
print("Average:", avg)
print("Grade:", grade)
print("Date:", datetime.date.today())

# 6.Contact Saver
contacts = {}
while True:
    print("\n1. Add Contact")
    print("2. View Contacts")
    print("3. Save & Exit")
    choice = input("Choose an option: ")

    if choice == "1":
        name = input("Enter contact name: ")
        phone = input("Enter phone number: ")
        contacts[name] = phone
    elif choice == "2":
        for name, phone in contacts.items():
            print(f"{name}: {phone}")
    elif choice == "3":
        with open("contacts.txt", "w") as file:
            for name, phone in contacts.items():
                file.write(f"{name}: {phone}\n")
        print("Contacts saved to contacts.txt")
        break
    else:
        print("Invalid choice. Try again.")




