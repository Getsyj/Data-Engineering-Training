#1
for i in range(1,51):
    if i%3==0 and i%5==0:
        print("FizzBuzz")
    elif i%3==0:
        print("Fizz")
    elif i%5==0:
        print("Buzz")
    else:
        print(i)
#2
correct_username = "admin"
correct_password = "1234"

for attempt in range(3):
    username = input("Enter username: ")
    password = input("Enter password: ")

    if username == correct_username and password == correct_password:
        print("Login Successful!")
        break
    else:
        print("Invalid credentials.")

else:
    print("Account Locked")

#3
word = input("Enter your word:")
if word == word[::-1]:
    print("It is a palindrome")
else:
    print("Not a palindrome")

#4
n = int(input("Enter a number: "))

print("Prime numbers up to", n, ":")

for num in range(2, n+1):
    is_prime = True
    for i in range(2, int(num**0.5)+1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        print(num)
#5
n = int(input("Enter the number of rows:"))
for i in range(1,n+1):
    print("*" * i)

#6
n =(input("Enter the number:"))
total = sum(int(digit) for digit in n)
print("Sum of digits:", total)

#7
num = int(input("Enter the number:"))
for i in range(1,11):
    print(f"{num} x {i} = {num * i}")

#8
sentence = input("Enter a sentence: ")
vowels = "aeiouAEIOU"
count = 0

for char in sentence:
    if char in vowels:
        count += 1

print("Number of vowels:", count)


