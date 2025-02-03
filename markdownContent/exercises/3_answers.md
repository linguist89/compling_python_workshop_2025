# Pandas and Matplotlib Exercise Solutions

## Beginner Level Solutions

### 1. Basic DataFrame Operations
```python
import pandas as pd

# Create DataFrame
data = {
    'name': ['John', 'Sarah', 'Mike', 'Emma'],
    'age': [28, 32, 24, 45],
    'city': ['New York', 'London', 'Paris', 'Tokyo']
}
df = pd.DataFrame(data)

# Print mean age
print(f"Mean age: {df['age'].mean()}")  # Output: 32.25

# Add has_pet column
df['has_pet'] = [True, False, True, True]

# Filter for people over 25
over_25 = df[df['age'] > 25]
print("\nPeople over 25:")
print(over_25)

# Sort by age
sorted_df = df.sort_values('age')
print("\nSorted by age:")
print(sorted_df)
```

### 2. Simple Plotting
```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.title("My First Plot")
plt.xlabel("Numbers")
plt.ylabel("Double Numbers")
plt.show()
```

## Intermediate Level Solutions

### 1. Data Analysis with CSV
```python
import pandas as pd
import matplotlib.pyplot as plt

# Read CSV file
df = pd.read_csv('height-weight.csv')

# Calculate summary statistics
print("Summary Statistics:")
print(df[['height', 'weight']].describe())

# Create BMI column
df['bmi'] = df['weight'] / (df['height'] ** 2)

# Group by lives_in_city and calculate mean BMI
city_bmi = df.groupby('lives_in_city')['bmi'].mean()
print("\nMean BMI by city:")
print(city_bmi)

# Create scatter plot
plt.figure(figsize=(10, 6))
for city in df['lives_in_city'].unique():
    mask = df['lives_in_city'] == city
    plt.scatter(df[mask]['height'], 
                df[mask]['weight'], 
                label=city)

plt.title('Height vs Weight by City')
plt.xlabel('Height (m)')
plt.ylabel('Weight (kg)')
plt.legend()
plt.savefig('height_weight_analysis.png')
plt.show()
```

### 2. DataFrame Manipulation
```python
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# Create sales DataFrame
dates = [datetime(2024, 1, 1) + timedelta(days=i) for i in range(8)]
data = {
    'product': ['Laptop', 'Phone', 'Tablet', 'Laptop', 'Phone', 'Tablet', 'Laptop', 'Phone'],
    'price': [1200, 800, 500, 1200, 800, 500, 1200, 800],
    'quantity': [2, 3, 4, 1, 2, 3, 2, 1],
    'date': dates
}
df = pd.DataFrame(data)

# Add total_sales column
df['total_sales'] = df['price'] * df['quantity']

# Group by product
product_sales = df.groupby('product')['total_sales'].sum()

# Filter for sales greater than mean
mean_sales = df['total_sales'].mean()
high_sales = df[df['total_sales'] > mean_sales]

# Create bar plot
plt.figure(figsize=(10, 6))
product_sales.plot(kind='bar')
plt.title('Total Sales by Product')
plt.xlabel('Product')
plt.ylabel('Total Sales ($)')
plt.tight_layout()
plt.show()
```

## Advanced Level Solutions

### 1. Command Line Script
```python
import argparse
import pandas as pd
import matplotlib.pyplot as plt
import logging
from pathlib import Path

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def parse_arguments():
    parser = argparse.ArgumentParser(description='Process CSV data and create plots')
    parser.add_argument('--input_file', required=True, help='Input CSV file path')
    parser.add_argument('--output_file', required=True, help='Output plot file path')
    parser.add_argument('--plot_type', choices=['line', 'scatter', 'bar'], default='scatter')
    parser.add_argument('--group_by', help='Column to group by')
    return parser.parse_args()

def read_data(file_path):
    try:
        return pd.read_csv(file_path)
    except FileNotFoundError:
        logger.error(f"File not found: {file_path}")
        raise
    except Exception as e:
        logger.error(f"Error reading file: {e}")
        raise

def create_plot(df, plot_type, group_by, output_file):
    plt.figure(figsize=(10, 6))
    
    try:
        if plot_type == 'scatter':
            if group_by:
                for group in df[group_by].unique():
                    mask = df[group_by] == group
                    plt.scatter(df[mask].iloc[:, 0], 
                              df[mask].iloc[:, 1], 
                              label=group)
            else:
                plt.scatter(df.iloc[:, 0], df.iloc[:, 1])
                
        elif plot_type == 'line':
            if group_by:
                for group in df[group_by].unique():
                    mask = df[group_by] == group
                    plt.plot(df[mask].iloc[:, 0], 
                           df[mask].iloc[:, 1], 
                           label=group)
            else:
                plt.plot(df.iloc[:, 0], df.iloc[:, 1])
                
        elif plot_type == 'bar':
            df.groupby(group_by).mean().plot(kind='bar')
            
        if group_by:
            plt.legend()
            
        plt.savefig(output_file)
        logger.info(f"Plot saved to {output_file}")
        
    except Exception as e:
        logger.error(f"Error creating plot: {e}")
        raise

def main():
    args = parse_arguments()
    
    try:
        df = read_data(args.input_file)
        create_plot(df, args.plot_type, args.group_by, args.output_file)
    except Exception as e:
        logger.error(f"Program failed: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
```

### 2. Custom Data Analysis Module
```python
from typing import Union, List, Dict
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path
import logging

class DataTransformer:
    """Class for handling data transformations and analysis."""
    
    def __init__(self, df: pd.DataFrame):
        """Initialize with a DataFrame."""
        self.df = df
        self._setup_logging()
    
    def _setup_logging(self):
        """Set up logging configuration."""
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
    
    def clean_data(self) -> pd.DataFrame:
        """Clean the DataFrame by removing duplicates and handling missing values."""
        try:
            self.df = self.df.drop_duplicates()
            self.df = self.df.fillna(self.df.mean(numeric_only=True))
            return self.df
        except Exception as e:
            self.logger.error(f"Error cleaning data: {e}")
            raise

    def calculate_statistics(self) -> Dict[str, Dict[str, float]]:
        """Calculate basic statistics for numerical columns."""
        try:
            stats = {}
            for col in self.df.select_dtypes(include=[np.number]).columns:
                stats[col] = {
                    'mean': self.df[col].mean(),
                    'median': self.df[col].median(),
                    'std': self.df[col].std()
                }
            return stats
        except Exception as e:
            self.logger.error(f"Error calculating statistics: {e}")
            raise

def read_csv(file_path: Union[str, Path]) -> pd.DataFrame:
    """Read CSV file and return DataFrame."""
    try:
        return pd.read_csv(file_path)
    except Exception as e:
        logging.error(f"Error reading CSV file: {e}")
        raise

def create_plot(df: pd.DataFrame, 
                x_col: str, 
                y_col: str, 
                plot_type: str = 'scatter',
                title: str = None) -> None:
    """Create and display a plot."""
    try:
        plt.figure(figsize=(10, 6))
        
        if plot_type == 'scatter':
            plt.scatter(df[x_col], df[y_col])
        elif plot_type == 'line':
            plt.plot(df[x_col], df[y_col])
        
        plt.xlabel(x_col)
        plt.ylabel(y_col)
        if title:
            plt.title(title)
        
        plt.show()
    except Exception as e:
        logging.error(f"Error creating plot: {e}")
        raise

# Example usage
if __name__ == "__main__":
    # Read data
    df = read_csv('sample_data.csv')
    
    # Create transformer instance
    transformer = DataTransformer(df)
    
    # Clean data
    clean_df = transformer.clean_data()
    
    # Calculate statistics
    stats = transformer.calculate_statistics()
    print("Statistics:", stats)
    
    # Create plot
    create_plot(clean_df, 'x_column', 'y_column', 'scatter', 'Sample Plot')
```

### Bonus Challenge Solution
```python
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
import logging
from fpdf import FPDF
import sys

class DataAnalysisDashboard:
    def __init__(self, input_dir: str, output_dir: str):
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self._setup_logging()
        
    def _setup_logging(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(self.output_dir / 'analysis.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        
    def read_csv_files(self) -> Dict[str, pd.DataFrame]:
        """Read all CSV files from input directory."""
        data_frames = {}
        try:
            for csv_file in self.input_dir.glob('*.csv'):
                logging.info(f"Reading {csv_file.name}")
                data_frames[csv_file.stem] = pd.read_csv(csv_file)
            return data_frames
        except Exception as e:
            logging.error(f"Error reading CSV files: {e}")
            raise
            
    def create_plots(self, data_frames: Dict[str, pd.DataFrame]):
        """Create plots for each DataFrame."""
        plot_paths = []
        try:
            for name, df in data_frames.items():
                # Create various plots
                plt.figure(figsize=(10, 6))
                # Example plot - modify based on your data
                df.plot()
                plt.title(f"Analysis of {name}")
                plot_path = self.output_dir / f"{name}_plot.png"
                plt.savefig(plot_path)
                plt.close()
                plot_paths.append(plot_path)
            return plot_paths
        except Exception as e:
            logging.error(f"Error creating plots: {e}")
            raise
            
    def generate_pdf_report(self, plot_paths: List[Path]):
        """Generate PDF report with all analyses."""
        try:
            pdf = FPDF()
            pdf.add_page()
            pdf.set_font("Arial", size=12)
            
            pdf.cell(200, 10, txt="Data Analysis Report", ln=1, align='C')
            
            for plot_path in plot_paths:
                pdf.image(str(plot_path), x=10, w=190)
                pdf.add_page()
            
            pdf.output(self.output_dir / "report.pdf")
            logging.info("PDF report generated successfully")
        except Exception as e:
            logging.error(f"Error generating PDF report: {e}")
            raise
            
    def run_analysis(self):
        """Run the complete analysis pipeline."""
        try:
            data_frames = self.read_csv_files()
            plot_paths = self.create_plots(data_frames)
            self.generate_pdf_report(plot_paths)
            logging.info("Analysis completed successfully")
        except Exception as e:
            logging.error(f"Analysis failed: {e}")
            raise

# Example usage
if __name__ == "__main__":
    dashboard = DataAnalysisDashboard("input_data", "output_results")
    dashboard.run_analysis()
```

This solution file provides detailed implementations for all exercises, including proper error handling, logging, and documentation. Each solution demonstrates best practices and includes comments explaining the key components.