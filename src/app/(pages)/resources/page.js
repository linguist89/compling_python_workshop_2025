'use client'

export default function ResourcesPage() {
  const resources = {
    documentation: [
      {
        title: "Python Documentation",
        description: "Official Python language documentation and tutorials",
        url: "https://docs.python.org/3/",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
      },
      {
        title: "NLTK Documentation",
        description: "Natural Language Toolkit documentation",
        url: "https://www.nltk.org/",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        ),
      },
      {
        title: "Pandas Documentation",
        description: "Data manipulation and analysis library docs",
        url: "https://pandas.pydata.org/docs/",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
      {
        title: "Matplotlib Documentation",
        description: "Guide to creating visualizations in Python",
        url: "https://matplotlib.org/stable/contents.html",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        ),
      },
    ],
    cheatSheets: [
      {
        title: "Python Basics Cheat Sheet",
        description: "Quick reference for Python fundamentals",
        downloadUrl: "/cheatsheets/python-basics.pdf",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
      {
        title: "Pandas Cheat Sheet",
        description: "Essential Pandas operations and methods",
        downloadUrl: "/cheatsheets/pandas.pdf",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
    ],
    additionalResources: [
      {
        title: "Python for Data Science Handbook",
        description: "Comprehensive guide to data science with Python",
        url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
      },
      {
        title: "Real Python Tutorials",
        description: "In-depth Python tutorials and articles",
        url: "https://realpython.com/",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        ),
      },
    ],
  };

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
            Learning Resources
          </h1>
          <p 
            className="text-lg mb-12"
            style={{ color: 'var(--text-secondary)' }}
          >
            Access documentation, cheat sheets, and additional resources to support your
            Python learning journey.
          </p>

          {/* Documentation Section */}
          <section className="mb-12">
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-accent)' }}
            >
              Documentation
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.documentation.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-6 rounded-lg transition-all duration-300"
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
                  <div 
                    className="flex-shrink-0"
                    style={{ color: 'var(--text-accent)' }}
                  >
                    {doc.icon}
                  </div>
                  <div className="ml-4">
                    <h3 
                      className="text-lg font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {doc.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {doc.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Cheat Sheets Section */}
          <section className="mb-12">
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-accent)' }}
            >
              Cheat Sheets
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.cheatSheets.map((sheet, index) => (
                <a
                  key={index}
                  href={sheet.downloadUrl}
                  className="flex items-start p-6 rounded-lg transition-all duration-300"
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
                  <div 
                    className="flex-shrink-0"
                    style={{ color: 'var(--text-accent)' }}
                  >
                    {sheet.icon}
                  </div>
                  <div className="ml-4">
                    <h3 
                      className="text-lg font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {sheet.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {sheet.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Additional Resources Section */}
          <section>
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-accent)' }}
            >
              Additional Resources
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.additionalResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-6 rounded-lg transition-all duration-300"
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
                  <div 
                    className="flex-shrink-0"
                    style={{ color: 'var(--text-accent)' }}
                  >
                    {resource.icon}
                  </div>
                  <div className="ml-4">
                    <h3 
                      className="text-lg font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {resource.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {resource.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 