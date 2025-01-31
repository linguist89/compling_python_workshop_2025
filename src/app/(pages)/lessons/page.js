export default function LessonsPage() {
  const lessons = [
    {
      id: 1,
      title: "Introduction to Python",
      description: "Learn the basics of Python programming, including variables, data types, and basic operations.",
      duration: "2 hours",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Flow Control & Functions",
      description: "Master Python's control structures including loops, conditionals, functions, and error handling.",
      duration: "2.5 hours",
      difficulty: "Beginner",
      topics: ["Loops", "Conditionals", "Functions", "Error Handling"],
    },
    {
      id: 3,
      title: "Data Structures",
      description: "Explore Python's built-in data structures: lists, dictionaries, sets, and tuples.",
      duration: "3 hours",
      difficulty: "Intermediate",
    },
    {
      id: 4,
      title: "Working with Pandas",
      description: "Learn to manipulate and analyze data using the Pandas library.",
      duration: "4 hours",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Data Visualization",
      description: "Create insightful visualizations using Matplotlib and Seaborn.",
      duration: "3 hours",
      difficulty: "Intermediate",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Python Lessons</h1>
          <p className="text-lg text-gray-600 mb-12">
            Start your Python journey with our comprehensive lessons. Each lesson includes
            interactive examples and hands-on exercises to reinforce your learning.
          </p>

          <div className="space-y-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {lesson.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{lesson.description}</p>
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {lesson.duration}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
                        {lesson.difficulty}
                      </span>
                    </div>
                    {lesson.topics && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {lesson.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <a
                    href={`/lessons/${lesson.id}`}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
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