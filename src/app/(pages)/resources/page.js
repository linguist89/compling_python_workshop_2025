export default function ResourcesPage() {
  const resources = {
    documentation: [
      {
        title: "Python Official Documentation",
        description: "Comprehensive guide to Python programming language",
        url: "https://docs.python.org/3/",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
      },
      {
        title: "Pandas Documentation",
        description: "Learn about data manipulation with Pandas",
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
        description: "Practical Python programming tutorials",
        url: "https://realpython.com/",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        ),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Learning Resources</h1>
          <p className="text-lg text-gray-600 mb-12">
            Access documentation, cheat sheets, and additional resources to support your
            Python learning journey.
          </p>

          {/* Documentation Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentation</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.documentation.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 text-primary">{doc.icon}</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                    <p className="text-gray-600">{doc.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Cheat Sheets Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cheat Sheets</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.cheatSheets.map((sheet, index) => (
                <a
                  key={index}
                  href={sheet.downloadUrl}
                  className="flex items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 text-accent">{sheet.icon}</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{sheet.title}</h3>
                    <p className="text-gray-600">{sheet.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Additional Resources Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.additionalResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 text-primary">{resource.icon}</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                    <p className="text-gray-600">{resource.description}</p>
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