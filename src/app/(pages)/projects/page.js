export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Text Analysis Tool",
      description: "Build a tool that analyzes text documents for word frequency, sentiment, and readability metrics.",
      skills: ["Text Processing", "NLTK", "Data Analysis"],
      duration: "1-2 weeks",
      image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Corpus Explorer",
      description: "Create an interactive tool to explore and analyze linguistic corpora using Python and Pandas.",
      skills: ["Pandas", "Data Visualization", "Web Scraping"],
      duration: "2-3 weeks",
      image: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Language Pattern Detector",
      description: "Develop a program that identifies linguistic patterns and generates statistics from text data.",
      skills: ["Regular Expressions", "Pattern Matching", "Statistics"],
      duration: "1-2 weeks",
      image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Python Projects</h1>
          <p className="text-lg text-gray-600 mb-12">
            Apply your Python skills to real-world computational linguistics projects.
            Each project includes starter code, documentation, and step-by-step guidance.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Required Skills:</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Duration: {project.duration}
                      </span>
                      <a
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
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