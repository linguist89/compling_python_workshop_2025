# Pandas and Matplotlib Exercises

## Beginner Level
1. **Basic DataFrame Operations**
   - Create a DataFrame with the following data:
     - Columns: 'name', 'age', 'city'
     - Add at least 4 rows of data
   - Tasks:
     - Print the mean age
     - Add a new column 'has_pet' with boolean values
     - Filter the DataFrame to show only people over 25
     - Sort the DataFrame by age

2. **Simple Plotting**
   - Create two lists: x = [1,2,3,4,5] and y = [2,4,6,8,10]
   - Tasks:
     - Create a line plot using matplotlib
     - Add appropriate title "My First Plot"
     - Add x-label "Numbers" and y-label "Double Numbers"
     - Display the plot

## Intermediate Level
1. **Data Analysis with CSV**
   - Use the provided height-weight.csv file
   - Tasks:
     - Calculate and display summary statistics (mean, median, std) for height and weight
     - Create a new column 'bmi' using the formula provided
     - Group the data by 'lives_in_city' and calculate mean BMI for each group
     - Create a scatter plot of height vs weight with different colors based on 'lives_in_city'
     - Add a legend and appropriate labels
     - Save the plot as 'height_weight_analysis.png'

2. **DataFrame Manipulation**
   - Create a DataFrame with sales data:
     - Columns: 'product', 'price', 'quantity', 'date'
     - Minimum 8 rows of data
   - Tasks:
     - Add a 'total_sales' column (price * quantity)
     - Group by product and calculate total sales for each
     - Filter for sales greater than the mean
     - Create a bar plot of total sales by product

## Advanced Level
1. **Command Line Script**
   - Create a command-line tool that processes CSV files
   - Requirements:
     - Accept arguments: --input_file, --output_file, --plot_type, --group_by
     - Support multiple plot types (line, scatter, bar)
     - Include error handling for missing files
     - Add logging for operations
     - Create proper documentation
   - Example usage:
     ```bash
     python analyze_data.py --input_file data.csv --output_file plot.png --plot_type scatter --group_by category
     ```

2. **Custom Data Analysis Module**
   - Create a Python module with the following features:
     - Function to read and clean CSV data
     - Function to perform statistical analysis
     - Function to create customized plots
     - Class for handling different data transformations
   - Requirements:
     - Include proper error handling
     - Add type hints
     - Write docstrings
     - Create unit tests
   - Create a sample script demonstrating all features

### Bonus Challenge
Create a dashboard using your custom module that:
- Reads data from multiple CSV files
- Creates various plots
- Saves a PDF report with all analyses
- Includes error handling and logging
