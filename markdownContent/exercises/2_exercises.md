# Flow Control Exercises

## Beginner Exercises
1. **For Loop Basics**
   - Create a list of 5 fruits and use a for loop to print each fruit
   - Expected output should be each fruit on a new line

2. **Counter Practice**
   - Write code that counts from 1 to 5 using a while loop
   - Print each number and increment using += operator
   - Expected output should show numbers 1 through 5

3. **Simple If-Else**
   - Write code that checks if a number is positive or negative
   - Test it with numbers: 5, -3, 0
   - Print "Positive" for positive numbers and "Negative" for negative numbers

## Intermediate Exercises
1. **List Comprehension**
   - Given the list: `numbers = [1, 2, 3, 4, 5]`
   - Create a new list containing the squares of these numbers using list comprehension
   - Expected output: `[1, 4, 9, 16, 25]`

2. **Function with Type Hints**
   - Create a function called `calculate_area` that takes width and height (both floats) and returns the area
   - Use proper type hints
   - Include a docstring explaining the function
   - Test with values: width=3.5, height=2.0

3. **Exception Handling**
   - Write a function that converts a string to an integer
   - Handle both ValueError and TypeError exceptions
   - Test with inputs: "123", "abc", 456

## Advanced Exercises
1. **Data Processing Function**
   ```python
   student_data = [
       ["Alice", "A", 95],
       ["Bob", "B", 85],
       ["Charlie", "A", 92],
       [404, "Error", "Invalid"],
       ["David", "C", 75]
   ]
   ```
   - Create a function that processes this data and creates a dictionary
   - Skip invalid entries (non-string names)
   - Convert grades to numerical values (A=4, B=3, C=2)
   - Final dictionary should have names as keys and tuples of (grade_point, score) as values

2. **Custom Iterator with Error Handling**
   - Create a class that iterates through a directory of files
   - Should only process .txt files
   - Use proper exception handling for file operations
   - Include a method to show progress (current file/total files)

3. **Advanced Function Design**
   - Create a function that accepts variable arguments (*args, **kwargs)
   - Function should process numerical inputs in different ways based on keyword arguments
   - Include type checking and appropriate error handling
   - Add comprehensive docstring with examples
   - Example operations: average, median, mode (based on kwargs)

For each exercise:
- Test your code with the provided examples
- Ensure proper error handling where appropriate
- Use clear variable names and add comments
- Follow Python PEP 8 style guidelines
