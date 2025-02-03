# Flow Control Exercise Solutions

## Beginner Exercise Solutions

### 1. For Loop Basics
```python
fruits = ["apple", "banana", "orange", "grape", "mango"]
for fruit in fruits:
    print(fruit)
```

### 2. Counter Practice
```python
count = 1
while count <= 5:
    print(count)
    count += 1
```

### 3. Simple If-Else
```python
def check_number(num):
    if num > 0:
        print("Positive")
    elif num < 0:
        print("Negative")
    else:
        print("Zero")

# Test cases
check_number(5)
check_number(-3)
check_number(0)
```

## Intermediate Exercise Solutions

### 1. List Comprehension
```python
numbers = [1, 2, 3, 4, 5]
squares = [num ** 2 for num in numbers]
print(squares)  # Output: [1, 4, 9, 16, 25]
```

### 2. Function with Type Hints
```python
def calculate_area(width: float, height: float) -> float:
    """
    Calculate the area of a rectangle given width and height.
    
    Args:
        width (float): The width of the rectangle
        height (float): The height of the rectangle
    
    Returns:
        float: The area of the rectangle
    """
    return width * height

# Test case
result = calculate_area(3.5, 2.0)
print(f"Area: {result}")  # Output: Area: 7.0
```

### 3. Exception Handling
```python
def string_to_int(value):
    try:
        return int(value)
    except ValueError:
        print(f"Could not convert '{value}' to integer: invalid format")
        return None
    except TypeError:
        print(f"Could not convert {value}: wrong type")
        return None

# Test cases
print(string_to_int("123"))    # Output: 123
print(string_to_int("abc"))    # Output: Could not convert 'abc' to integer: invalid format
print(string_to_int(456))      # Output: 456
```

## Advanced Exercise Solutions

### 1. Data Processing Function
```python
def process_student_data(data: list) -> dict:
    """
    Process student data and convert to a dictionary with grade points.
    
    Args:
        data (list): List of student records [name, letter_grade, score]
    
    Returns:
        dict: Dictionary with student names as keys and (grade_point, score) as values
    """
    grade_points = {"A": 4, "B": 3, "C": 2, "D": 1, "F": 0}
    result = {}
    
    for record in data:
        try:
            name, letter_grade, score = record
            
            # Skip if name is not a string
            if not isinstance(name, str):
                continue
                
            # Convert grade to grade point
            grade_point = grade_points.get(letter_grade, 0)
            
            # Convert score to int if possible
            score = int(score) if isinstance(score, (int, str)) and str(score).isdigit() else 0
            
            result[name] = (grade_point, score)
            
        except (ValueError, TypeError, IndexError):
            continue
    
    return result

# Test case
student_data = [
    ["Alice", "A", 95],
    ["Bob", "B", 85],
    ["Charlie", "A", 92],
    [404, "Error", "Invalid"],
    ["David", "C", 75]
]

result = process_student_data(student_data)
print(result)
```

### 2. Custom Iterator with Error Handling
```python
import os
from typing import Iterator

class TextFileIterator:
    """Iterator class for processing text files in a directory."""
    
    def __init__(self, directory: str):
        self.directory = directory
        self.files = [f for f in os.listdir(directory) if f.endswith('.txt')]
        self.current = 0
        self.total = len(self.files)
    
    def __iter__(self) -> Iterator:
        return self
    
    def __next__(self) -> str:
        if self.current >= self.total:
            raise StopIteration
        
        filename = self.files[self.current]
        self.current += 1
        
        try:
            with open(os.path.join(self.directory, filename), 'r') as file:
                content = file.read()
            return content
        except IOError as e:
            print(f"Error reading {filename}: {e}")
            return ""
    
    def progress(self) -> str:
        return f"Processing file {self.current}/{self.total}"

# Usage example:
# iterator = TextFileIterator("path/to/directory")
# for content in iterator:
#     print(iterator.progress())
#     print(content)
```

### 3. Advanced Function Design
```python
from typing import Union, List
from statistics import mean, median, mode
from collections import Counter

def process_numbers(*args: Union[int, float], **kwargs) -> dict:
    """
    Process numerical inputs based on specified operations.
    
    Args:
        *args: Variable number of numerical inputs
        **kwargs: Operations to perform on the numbers
            Supported operations:
            - calc_average (bool): Calculate average
            - calc_median (bool): Calculate median
            - calc_mode (bool): Calculate mode
            - round_to (int): Round results to specified decimals
    
    Returns:
        dict: Results of requested operations
    
    Examples:
        >>> process_numbers(1, 2, 2, 3, calc_average=True, calc_mode=True)
        {'average': 2.0, 'mode': 2}
        
        >>> process_numbers(1.5, 2.5, 3.5, calc_median=True, round_to=1)
        {'median': 2.5}
    """
    if not args:
        raise ValueError("At least one number must be provided")
    
    # Validate inputs are numbers
    numbers = []
    for num in args:
        if not isinstance(num, (int, float)):
            raise TypeError(f"All arguments must be numbers, got {type(num)}")
        numbers.append(float(num))
    
    # Get rounding precision
    round_to = kwargs.get('round_to', 2)
    
    # Initialize results
    results = {}
    
    # Perform requested calculations
    if kwargs.get('calc_average'):
        results['average'] = round(mean(numbers), round_to)
    
    if kwargs.get('calc_median'):
        results['median'] = round(median(numbers), round_to)
    
    if kwargs.get('calc_mode'):
        # Handle multi-modal data
        data_counter = Counter(numbers)
        max_count = max(data_counter.values())
        modes = [num for num, count in data_counter.items() if count == max_count]
        results['mode'] = round(modes[0], round_to) if len(modes) == 1 else modes
    
    return results

# Test cases
print(process_numbers(1, 2, 2, 3, calc_average=True, calc_mode=True))
print(process_numbers(1.5, 2.5, 3.5, calc_median=True, round_to=1))
```

Each solution includes:
- Complete working code
- Type hints where appropriate
- Error handling
- Comments explaining complex logic
- Test cases demonstrating usage

Remember to test these solutions thoroughly with different inputs and edge cases when implementing them. 