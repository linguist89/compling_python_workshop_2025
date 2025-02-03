'use client'
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { useContext, useEffect, useMemo } from 'react';
import { ProgressContext } from '@/app/contexts/ProgressContext';

export default function LessonContent({ content, lessonId }) {
  const { markSectionComplete, setTotalSections, progress } = useContext(ProgressContext);
  
  // Split content into main content and sections
  const { mainContent, sections } = useMemo(() => {
    if (!content) return { mainContent: '', sections: [] };
    
    // Find the first ## heading
    const firstSectionIndex = content.search(/^##\s/m);
    
    // If no ## headings found, return all content as main content
    if (firstSectionIndex === -1) {
      return { mainContent: content, sections: [] };
    }
    
    // Split the content into main content and sections
    const main = content.slice(0, firstSectionIndex);
    const sectionsContent = content.slice(firstSectionIndex);
    
    // Split remaining content by ## headings
    const sectionParts = sectionsContent.split(/(?=^##\s)/m);
    
    // Parse each section
    const parsedSections = sectionParts.filter(Boolean).map((section, index) => {
      const titleMatch = section.match(/^##\s(.+)$/m);
      const title = titleMatch ? titleMatch[1] : `Section ${index + 1}`;
      return { title, content: section };
    });

    return {
      mainContent: main,
      sections: parsedSections
    };
  }, [content]);

  // Count sections and set total on mount
  useEffect(() => {
    if (!content || !lessonId) return;
    setTotalSections(lessonId, sections.length);
  }, [content, lessonId, setTotalSections, sections.length]);

  const completedSections = progress?.lessons?.[lessonId]?.completedSections || 0;

  return (
    <div className="space-y-8">
      {/* Main Content */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : 'text';
              const codeContent = String(children).replace(/\n$/, '');
              
              if (inline || !codeContent.includes('\n')) {
                return (
                  <code 
                    className={className}
                    style={{
                      backgroundColor: '#2d2d2d',
                      padding: '0.2em 0.4em',
                      borderRadius: '0.2em',
                      fontSize: '0.9em'
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              return (
                <div className="relative rounded-lg overflow-hidden my-4">
                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.5rem',
                      fontSize: '0.9em',
                      lineHeight: '1.5'
                    }}
                    showLineNumbers={true}
                    wrapLines={true}
                    {...props}
                  >
                    {codeContent}
                  </SyntaxHighlighter>
                </div>
              );
            }
          }}
        >
          {mainContent}
        </ReactMarkdown>
      </div>

      {/* Sections */}
      {sections.map((section, index) => {
        const isCompleted = index < completedSections;
        
        return (
          <div 
            key={index}
            className="rounded-lg overflow-hidden border border-gray-700"
            style={{
              backgroundColor: 'var(--card-background)',
            }}
          >
            {/* Section Title */}
            <div 
              className="border-b border-gray-700 p-4"
              style={{
                backgroundColor: 'var(--card-background-light)',
              }}
            >
              <h2 className="text-2xl font-semibold m-0">{section.title}</h2>
            </div>
            
            {/* Section Content */}
            <div className="p-6">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: () => null,
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : 'text';
                      const codeContent = String(children).replace(/\n$/, '');
                      
                      if (inline || !codeContent.includes('\n')) {
                        return (
                          <code 
                            className={className}
                            style={{
                              backgroundColor: '#2d2d2d',
                              padding: '0.2em 0.4em',
                              borderRadius: '0.2em',
                              fontSize: '0.9em'
                            }}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }

                      return (
                        <div className="relative rounded-lg overflow-hidden my-4">
                          <SyntaxHighlighter
                            language={language}
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: '0.5rem',
                              fontSize: '0.9em',
                              lineHeight: '1.5'
                            }}
                            showLineNumbers={true}
                            wrapLines={true}
                            {...props}
                          >
                            {codeContent}
                          </SyntaxHighlighter>
                        </div>
                      );
                    }
                  }}
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Button Container */}
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <button
                onClick={() => markSectionComplete(lessonId)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isCompleted 
                    ? 'bg-green-600 text-white cursor-not-allowed opacity-75'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={isCompleted}
              >
                {isCompleted ? 'Completed' : 'Mark as Complete'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
} 