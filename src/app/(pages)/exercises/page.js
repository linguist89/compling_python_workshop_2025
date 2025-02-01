'use client'

export default function ExercisesPage() {
  const exercises = [
    {
      id: 1,
      title: "String and List Manipulation",
      description: "Process a list of book titles and their publication years to practice string manipulation, list operations, and basic Python data types.",
      difficulty: "Beginner",
      topics: ["Strings", "Lists", "Sorting", "Data Types"]
    },
    {
      id: 2,
      title: "Grade Calculator",
      description: "Create a program that processes student grades and generates a summary report using functions, error handling, and data processing.",
      difficulty: "Intermediate",
      topics: ["Functions", "Error Handling", "Data Processing", "Formatting"]
    },
    {
      id: 3,
      title: "COVID-19 Data Analysis",
      description: "Analyze and visualize COVID-19 vaccination data using Pandas for data manipulation and Matplotlib for creating informative visualizations.",
      difficulty: "Advanced",
      topics: ["Pandas", "Matplotlib", "Data Analysis", "Visualization"]
    }
  ];

  return (
    <div 
      className="min-h-screen py-12"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-4xl font-bold mb-8"
            style={{
              background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Interactive Exercises
          </h1>
          <p 
            className="text-lg mb-12"
            style={{ color: 'var(--text-secondary)' }}
          >
            Test your Python skills with these hands-on exercises. Each exercise provides sample input data,
            clear requirements, and expected outputs to help you validate your solution.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="rounded-lg p-6 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--card-border)',
                  boxShadow: 'var(--card-shadow)'
                }}
              >
                <h2 
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--text-accent)' }}
                >
                  {exercise.title}
                </h2>
                <p 
                  className="mb-4"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {exercise.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Difficulty:
                    </span>
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: exercise.difficulty === 'Beginner' 
                          ? 'var(--interactive-hover)20'
                          : exercise.difficulty === 'Intermediate'
                          ? 'var(--color-secondary)20'
                          : 'var(--color-accent)20',
                        color: exercise.difficulty === 'Beginner'
                          ? 'var(--interactive-hover)'
                          : exercise.difficulty === 'Intermediate'
                          ? 'var(--color-secondary)'
                          : 'var(--color-accent)'
                      }}
                    >
                      {exercise.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exercise.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: 'var(--text-accent)20',
                          color: 'var(--text-accent)'
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={`/exercises/${exercise.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                    style={{
                      background: 'linear-gradient(to right, var(--color-accent), var(--color-secondary))',
                      color: 'var(--text-inverse)',
                      boxShadow: 'var(--effect-buttonHover)'
                    }}
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