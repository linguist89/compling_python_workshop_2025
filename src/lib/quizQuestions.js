export const quizQuestions = [
  {
    id: 1,
    question: "What is the correct way to assign a variable in Python?",
    options: [
      "variable == value",
      "variable := value",
      "variable = value",
      "variable => value"
    ],
    correctAnswer: 2  // 0-based index
  },
  {
    id: 2,
    question: "Which of the following is NOT a valid variable name in Python?",
    options: [
      "my_variable_1",
      "MyVariable",
      "my-variable",
      "_hidden"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What is the output of: print(text_snippet[0]) if text_snippet = 'Hello'?",
    options: [
      "Hello",
      "H",
      "o",
      "1"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "In Python list slicing, what does list[1:4] return?",
    options: [
      "Elements at index 1, 2, 3, and 4",
      "Elements at index 1, 2, and 3",
      "Elements at index 1 and 4",
      "Elements at index 4 only"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Which of these is the correct way to create an f-string?",
    options: [
      "'Hello {name}'",
      "f'Hello {name}'",
      "'Hello ${name}'",
      "format('Hello {name}')"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What happens when you multiply a string by 3 in Python?",
    options: [
      "It raises a TypeError",
      "It converts the string to a number and multiplies it",
      "It repeats the string three times",
      "It creates a list with the string repeated three times"
    ],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "Which Pandas function would you use to read a CSV file?",
    options: [
      "pd.readCSV()",
      "pd.read_csv()",
      "pd.load_csv()",
      "pd.import_csv()"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "How do you access a specific column in a Pandas DataFrame?",
    options: [
      "df.column_name",
      "df[column_name]",
      "df['column_name']",
      "df.get('column_name')"
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "What is the correct way to create a scatter plot using Matplotlib?",
    options: [
      "plt.scatter(x, y)",
      "plt.plot.scatter(x, y)",
      "plt.scatterplot(x, y)",
      "plt.draw_scatter(x, y)"
    ],
    correctAnswer: 0
  },
  {
    id: 10,
    question: "Which of these is NOT a valid way to group data in Pandas?",
    options: [
      "df.groupby('column').mean()",
      "df.group('column').mean()",
      "df.groupby(['col1', 'col2']).mean()",
      "df.groupby('column').agg(['mean', 'sum'])"
    ],
    correctAnswer: 1
  }
]; 