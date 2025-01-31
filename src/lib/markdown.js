import matter from 'gray-matter';

const lessons = {
  '1': `---
title: Introduction to Python
---
# Introduction to Python

Welcome to the first lesson of our Python for Computational Linguistics workshop! In this lesson, we'll cover the fundamentals of Python programming.

## What is Python?

Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in computational linguistics, data science, and many other fields.

## Basic Syntax

Let's start with some basic Python syntax:

\`\`\`python
# This is a comment
print("Hello, World!")  # This prints "Hello, World!"

# Variables
name = "Python"
version = 3.9
is_fun = True

# Basic operations
x = 5
y = 3
sum = x + y
print(f"{x} + {y} = {sum}")
\`\`\`

## Data Types

Python has several built-in data types:

1. **Strings** - Text data
2. **Numbers** - Integers and floating-point numbers
3. **Booleans** - True/False values
4. **Lists** - Ordered collections
5. **Dictionaries** - Key-value pairs
6. **Tuples** - Immutable sequences
7. **Sets** - Unordered collections of unique elements

## Practice Exercise

Try running this code in your Python environment:

\`\`\`python
# Create variables of different types
text = "Computational Linguistics"
number = 42
items = ["text", "speech", "data"]

# Print them out with type information
print(f"{text} is a {type(text)}")
print(f"{number} is a {type(number)}")
print(f"{items} is a {type(items)}")
\`\`\`

In the next lesson, we'll explore control flow with if statements and loops!`,
  '2': `---
title: Flow Control
---
# Flow Control in Python

In this lesson, we'll learn about controlling the flow of our Python programs using conditional statements and loops.

## Conditional Statements

Python uses \`if\`, \`elif\`, and \`else\` for conditional execution:

\`\`\`python
age = 20

if age < 18:
    print("You're a minor")
elif age < 65:
    print("You're an adult")
else:
    print("You're a senior")
\`\`\`

## Loops

Python has two main types of loops:

### For Loops

\`\`\`python
# Iterating over a list
words = ["Python", "is", "awesome"]
for word in words:
    print(word)

# Using range
for i in range(5):
    print(i)  # Prints 0 to 4
\`\`\`

### While Loops

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Practice Exercise

Create a program that:
1. Takes a list of numbers
2. Filters out even numbers
3. Doubles the remaining numbers

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = []

for num in numbers:
    if num % 2 != 0:  # Check if number is odd
        result.append(num * 2)

print(result)  # Should print [2, 6, 10, 14, 18]
\`\`\`

In the next lesson, we'll explore working with Pandas and Matplotlib for data analysis and visualization!`,
  '3': `---
title: Pandas and Matplotlib
---
# Data Analysis with Pandas and Matplotlib

In this lesson, we'll learn how to analyze and visualize data using Pandas and Matplotlib.

## Pandas Basics

Pandas is a powerful library for data manipulation:

\`\`\`python
import pandas as pd

# Create a DataFrame
data = {
    'word': ['the', 'quick', 'brown', 'fox'],
    'length': [3, 5, 5, 3],
    'frequency': [100, 20, 15, 25]
}
df = pd.DataFrame(data)

# Basic operations
print(df.head())
print(df.describe())
print(df.sort_values('frequency', ascending=False))
\`\`\`

## Data Visualization with Matplotlib

Matplotlib helps us create visual representations of our data:

\`\`\`python
import matplotlib.pyplot as plt

# Create a bar plot
plt.figure(figsize=(10, 6))
plt.bar(df['word'], df['frequency'])
plt.title('Word Frequencies')
plt.xlabel('Words')
plt.ylabel('Frequency')
plt.xticks(rotation=45)
plt.show()
\`\`\`

## Practice Exercise

Create a program that:
1. Loads a text file
2. Counts word frequencies
3. Creates a bar plot of the top 10 most frequent words

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
from collections import Counter

# Sample text
text = """
Python is a great programming language.
Python is widely used in computational linguistics.
Programming in Python is fun and productive.
"""

# Count words
words = text.lower().split()
word_counts = Counter(words)

# Create DataFrame
df = pd.DataFrame.from_dict(word_counts, orient='index', columns=['count'])
df = df.sort_values('count', ascending=False).head(10)

# Create plot
plt.figure(figsize=(12, 6))
df['count'].plot(kind='bar')
plt.title('Top 10 Most Frequent Words')
plt.xlabel('Words')
plt.ylabel('Frequency')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
\`\`\`

Congratulations! You've completed the basic Python for Computational Linguistics workshop!`
};

export function getAllMarkdownFiles() {
  return Object.entries(lessons).map(([id, content]) => {
    const { data } = matter(content);
    return {
      id,
      ...data
    };
  });
}

export function getMarkdownContent(id) {
  const content = lessons[id];
  if (!content) {
    throw new Error(`No content found for lesson ${id}`);
  }
  return content;
} 