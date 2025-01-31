'use client'

export default function ExercisesPage() {
  const exercises = [
    {
      id: 1,
      title: "Python Basics",
      description: "Practice fundamental Python concepts including variables, data types, and basic operations.",
      difficulty: "Beginner",
      estimatedTime: "30 minutes",
      topics: ["Variables", "Data Types", "Operations"]
    },
    {
      id: 2,
      title: "Control Flow",
      description: "Work with if statements, loops, and conditional expressions.",
      difficulty: "Beginner",
      estimatedTime: "45 minutes",
      topics: ["If Statements", "Loops", "Conditionals"]
    },
    {
      id: 3,
      title: "Functions and Modules",
      description: "Create and use functions, import modules, and understand scope.",
      difficulty: "Intermediate",
      estimatedTime: "1 hour",
      topics: ["Functions", "Modules", "Scope"]
    },
    {
      id: 4,
      title: "Data Analysis with Pandas",
      description: "Analyze linguistic data using Pandas DataFrames.",
      difficulty: "Advanced",
      estimatedTime: "1.5 hours",
      topics: ["Pandas", "Data Analysis", "Statistics"]
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
            Put your Python skills to the test with our interactive exercises. Each exercise
            includes real-time feedback and hints to help you learn.
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
                  
                  <div className="flex items-center space-x-2">
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Time:
                    </span>
                    <span 
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {exercise.estimatedTime}
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