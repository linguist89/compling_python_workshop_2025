'use client'

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Text Analysis Tool",
      description: "Build a command-line tool for analyzing text files, including word frequency, readability scores, and basic NLP features.",
      skills: ["File I/O", "Text Processing", "CLI"],
      duration: "1-2 weeks",
      image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Corpus Analyzer",
      description: "Create a tool to analyze linguistic corpora, extract patterns, and generate statistics.",
      skills: ["NLTK", "Regular Expressions", "Statistics"],
      duration: "2 weeks",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Language Model",
      description: "Implement a simple n-gram language model for text generation and probability estimation.",
      skills: ["Probability", "NLP", "Algorithms"],
      duration: "2-3 weeks",
      image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      title: "Visualization Dashboard",
      description: "Build an interactive dashboard for visualizing linguistic data using Matplotlib and Streamlit.",
      skills: ["Matplotlib", "Streamlit", "Interactive Viz"],
      duration: "2-3 weeks",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div 
      className="min-h-screen py-12"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 
            className="text-4xl font-bold mb-8"
            style={{
              background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Python Projects
          </h1>
          <p 
            className="text-lg mb-12"
            style={{ color: 'var(--text-secondary)' }}
          >
            Apply your Python skills to real-world computational linguistics projects.
            Each project includes starter code, documentation, and step-by-step guidance.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                  ':hover': {
                    boxShadow: 'var(--effect-cardHover)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 
                    className="text-2xl font-semibold mb-3"
                    style={{ color: 'var(--text-accent)' }}
                  >
                    {project.title}
                  </h2>
                  <p 
                    className="mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {project.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 
                        className="text-sm font-medium mb-2"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Required Skills:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: 'var(--text-accent)20',
                              color: 'var(--text-accent)'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Duration: {project.duration}
                      </span>
                      <a
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                        style={{
                          background: 'linear-gradient(to right, var(--color-accent), var(--color-secondary))',
                          color: 'var(--text-inverse)',
                          boxShadow: 'var(--effect-buttonHover)'
                        }}
                      >
                        View Project
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 