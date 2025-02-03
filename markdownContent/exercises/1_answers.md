# Python Basics Exercise Solutions

## Beginner Exercise Solutions

1. **Variable Assignment**
```python
# Variable assignments
age = 25
name = "John Doe"
is_student = True

# Print variables and their types
print(f"Age: {age} ({type(age)})")
print(f"Name: {name} ({type(name)})")
print(f"Is Student: {is_student} ({type(is_student)})")
```

2. **String Operations**
```python
text = "Hello, Python World!"

# Extract "Python" using slicing
python_word = text[7:13]
print(f"Extracted word: {python_word}")

# Convert to uppercase
uppercase_text = text.upper()
print(f"Uppercase: {uppercase_text}")

# Count letter 'o'
o_count = text.count('o')
print(f"Number of 'o's: {o_count}")
```

3. **List Basics**
```python
# Create list of colors
colors = ["red", "blue", "green"]

# Add new color
colors.append("yellow")
print(f"After append: {colors}")

# Remove a color
colors.remove("blue")
print(f"After remove: {colors}")

# Print first and last colors
print(f"First color: {colors[0]}")
print(f"Last color: {colors[-1]}")
```

## Intermediate Exercise Solutions

1. **Dictionary Challenge**
```python
# Create grades dictionary
grades = {
    "Math": (85, 3),
    "English": (92, 3),
    "Physics": (78, 4),
    "History": (95, 2)
}

# Calculate average grade
total_grade = sum(grade[0] * grade[1] for grade in grades.values())
total_credits = sum(grade[1] for grade in grades.values())
average_grade = total_grade / total_credits

print(f"Average grade: {average_grade:.2f}")

# Find subject with highest grade
highest_grade_subject = max(grades.items(), key=lambda x: x[1][0])
print(f"Highest grade in {highest_grade_subject[0]}: {highest_grade_subject[1][0]}")
```

2. **String Formatting**
```python
product = "Laptop"
price = 999.99
quantity = 5

formatted_output = f"Currently we have {quantity} units of {product} at ${price:.2f} each"
print(formatted_output)
```

3. **List and Set Operations**
```python
list1 = [1, 2, 3, 2, 4, 5, 5, 6]
list2 = [4, 5, 6, 7, 8, 9]

# Find unique numbers in both lists
unique_numbers = set(list1).union(set(list2))
print(f"Unique numbers: {unique_numbers}")

# Find numbers that appear in both lists
common_numbers = set(list1).intersection(set(list2))
print(f"Common numbers: {common_numbers}")

# Find numbers unique to list1
list1_only = set(list1).difference(set(list2))
print(f"Numbers only in list1: {list1_only}")
```

## Advanced Exercise Solutions

1. **Data Structure Manipulation**
```python
class Library:
    def __init__(self):
        self.books = {
            "Fiction": {},
            "Non-Fiction": {},
            "Science": {}
        }
    
    def add_book(self, category, title, author, year, copies):
        if category not in self.books:
            raise ValueError("Invalid category")
        
        self.books[category][title] = {
            "author": author,
            "year": year,
            "available_copies": copies
        }
    
    def remove_book(self, category, title):
        if category in self.books and title in self.books[category]:
            del self.books[category][title]
            return True
        return False
    
    def is_available(self, category, title):
        if category in self.books and title in self.books[category]:
            return self.books[category][title]["available_copies"] > 0
        return False
    
    def list_category_books(self, category):
        if category not in self.books:
            return []
        return list(self.books[category].keys())

# Example usage
library = Library()
library.add_book("Fiction", "1984", "George Orwell", 1949, 3)
library.add_book("Fiction", "Dune", "Frank Herbert", 1965, 2)
print(library.list_category_books("Fiction"))
```

2. **String Processing**
```python
import re
from collections import Counter

def analyze_text_file(file_path):
    try:
        with open(file_path, 'r') as file:
            text = file.read().lower()
            
        # Remove punctuation and split into words
        words = re.findall(r'\b\w+\b', text)
        
        # Count word frequencies
        word_freq = Counter(words)
        
        # Get most common words
        most_common = word_freq.most_common(5)
        
        return dict(word_freq), most_common
    
    except FileNotFoundError:
        return None, None
```

3. **Type Conversion Challenge**
```python
def convert_number_strings(number_strings):
    def convert_single_number(num_str):
        try:
            # Handle scientific notation
            if 'e' in num_str.lower():
                return float(num_str)
            
            # Handle fractions
            if '/' in num_str:
                num, denom = map(float, num_str.split('/'))
                return num / denom
            
            # Handle thousands separator
            num_str = num_str.replace(',', '')
            
            # Convert to float first
            num = float(num_str)
            
            # Convert to int if it's a whole number
            if num.is_integer():
                return int(num)
            return num
            
        except (ValueError, ZeroDivisionError):
            return None

    return [convert_single_number(num) for num in number_strings]

# Test the function
numbers = ["1", "2.5", "3,000", "4,000.5", "1/2", "2e3"]
converted = convert_number_strings(numbers)
print(converted)  # [1, 2.5, 3000, 4000.5, 0.5, 2000.0]
```

These solutions demonstrate proper Python coding practices and include error handling where appropriate. Each solution is documented with comments to explain the approach taken.
