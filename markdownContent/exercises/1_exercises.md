# Python Basics Exercises

## Beginner Exercises

1. **Variable Assignment**
   Create three variables:
   - A number representing your age
   - A string containing your name
   - A boolean indicating if you're a student
   
   Print each variable and its type using the `type()` function.

2. **String Operations**
   Given the string: `"Hello, Python World!"`
   - Extract the word "Python" using string slicing
   - Convert the entire string to uppercase
   - Count how many times the letter 'o' appears

3. **List Basics**
   Create a list of your favorite colors:
   - Add a new color using `append()`
   - Remove one color using `remove()`
   - Print the first and last colors in the list

## Intermediate Exercises

1. **Dictionary Challenge**
   Create a dictionary representing a student's grades:
   - Keys should be subject names
   - Values should be tuples containing (grade, credits)
   - Calculate the average grade
   - Print the subject with the highest grade

2. **String Formatting**
   Create variables for:
   - A product name
   - Its price
   - Its quantity in stock
   
   Use f-strings to create a formatted output like:
   "Currently we have {quantity} units of {product} at ${price} each"

3. **List and Set Operations**
   Given two lists of numbers:
   ```python
   list1 = [1, 2, 3, 2, 4, 5, 5, 6]
   list2 = [4, 5, 6, 7, 8, 9]
   ```
   - Find unique numbers in both lists using sets
   - Find numbers that appear in both lists
   - Find numbers that appear in list1 but not in list2

## Advanced Exercises

1. **Data Structure Manipulation**
   Create a nested dictionary representing a small library:
   - Each key is a book category
   - Each value is another dictionary containing books
   - Each book should have: title, author, publication year, and available copies
   
   Write functions to:
   - Add a new book
   - Remove a book
   - Check if a book is available
   - List all books in a category

2. **String Processing**
   Given a text file path, write a function that:
   - Reads the file
   - Counts word frequency
   - Identifies the most common words
   - Returns a dictionary of word frequencies
   - Ignores punctuation and case

3. **Type Conversion Challenge**
   Write a function that takes a list of strings containing numbers in various formats:
   ```python
   numbers = ["1", "2.5", "3,000", "4,000.5", "1/2", "2e3"]
   ```
   Convert each to its proper numerical representation (float or int).
   Handle potential errors and edge cases.
