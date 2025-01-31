export default function ExercisesPage() {
  const exercises = [
    {
      id: 1,
      title: "String Manipulation",
      description: "Practice working with strings, string methods, and formatting in Python.",
      difficulty: "Beginner",
      estimatedTime: "30 mins",
      topics: ["Strings", "Methods", "Formatting"],
    },
    {
      id: 2,
      title: "List Operations",
      description: "Master list operations including slicing, sorting, and list comprehensions.",
      difficulty: "Beginner",
      estimatedTime: "45 mins",
      topics: ["Lists", "Sorting", "Comprehensions"],
    },
    {
      id: 3,
      title: "Dictionary Challenges",
      description: "Learn to work with dictionaries through practical exercises.",
      difficulty: "Intermediate",
      estimatedTime: "1 hour",
      topics: ["Dictionaries", "Key-Value Pairs", "Methods"],
    },
    {
      id: 4,
      title: "Data Analysis with Pandas",
      description: "Practice data manipulation and analysis using Pandas DataFrame.",
      difficulty: "Intermediate",
      estimatedTime: "1.5 hours",
      topics: ["Pandas", "DataFrame", "Analysis"],
    },
    {
      id: 5,
      title: "Visualization Challenge",
      description: "Create various types of plots using Matplotlib and Seaborn.",
      difficulty: "Advanced",
      estimatedTime: "2 hours",
      topics: ["Matplotlib", "Seaborn", "Plotting"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Interactive Exercises</h1>
          <p className="text-lg text-gray-600 mb-12">
            Put your Python skills to the test with our interactive exercises. Each exercise
            includes real-time feedback and hints to help you learn.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {exercise.title}
                </h2>
                <p className="text-gray-600 mb-4">{exercise.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-500">Difficulty:</span>
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}
                    `}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-500">Time:</span>
                    <span className="text-sm text-gray-600">{exercise.estimatedTime}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exercise.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={`/exercises/${exercise.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                  >
                    Start Exercise
                    <svg
                      className="ml-2 -mr-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 