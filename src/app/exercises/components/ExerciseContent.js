'use client'

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function ExerciseContent({ content }) {
  const [mounted, setMounted] = useState(false);
  const { currentTheme } = useTheme() || { currentTheme: { isDark: true } };
  const [expandedSections, setExpandedSections] = useState({});
  const [copiedStates, setCopiedStates] = useState({});
  
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const cleanCodeIndentation = (code) => {
    // Split into lines and get non-empty lines
    const lines = code.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim().length > 0);

    // Find the minimum indentation level
    const minIndent = Math.min(
      ...nonEmptyLines.map(line => {
        const match = line.match(/^\s*/);
        return match ? match[0].length : 0;
      })
    );

    // Remove the common indentation from all lines while preserving relative indentation
    return lines
      .map(line => {
        if (line.trim().length === 0) return '';
        return line.slice(minIndent);
      })
      .join('\n')
      .trim();
  };

  const handleCopyClick = (code, index) => {
    const cleanCode = cleanCodeIndentation(code);
    navigator.clipboard.writeText(cleanCode).then(() => {
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    });
  };

  // If not mounted yet, show a simple loading state that matches the theme
  if (!mounted) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" style={{ backgroundColor: 'var(--card-border)' }}></div>
        <div className="h-4 bg-gray-200 rounded w-1/2" style={{ backgroundColor: 'var(--card-border)' }}></div>
        <div className="h-4 bg-gray-200 rounded w-5/6" style={{ backgroundColor: 'var(--card-border)' }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Content */}
      <div className="prose prose-invert max-w-none" style={{ color: 'var(--text-primary)' }}>
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
                      backgroundColor: 'var(--inline-code-bg)',
                      color: 'var(--inline-code-color)',
                      padding: '0.2em 0.4em',
                      borderRadius: '0.2em',
                      fontSize: '0.9em',
                      fontWeight: '500'
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              return (
                <div className="relative">
                  <button
                    onClick={() => handleCopyClick(codeContent, `${language}-${codeContent.slice(0, 20)}`)}
                    className="absolute right-2 top-2 p-1 rounded-md transition-all duration-200 hover:bg-opacity-80 flex items-center gap-2"
                    style={{ 
                      backgroundColor: 'var(--interactive-hover)',
                      color: 'var(--text-inverse)',
                      zIndex: 10
                    }}
                    title="Copy code"
                  >
                    {copiedStates[`${language}-${codeContent.slice(0, 20)}`] ? (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-3 w-3" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    ) : (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                        />
                      </svg>
                    )}
                  </button>
                  <SyntaxHighlighter
                    language={language}
                    style={currentTheme?.isDark ? vscDarkPlus : oneLight}
                    customStyle={{
                      margin: '0.5rem 0',
                      borderRadius: '0.5rem',
                      fontSize: '0.9em',
                      lineHeight: '1.5',
                      backgroundColor: 'var(--lesson-card-background)',
                      border: '1px solid var(--card-border)',
                      padding: '0.75rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                    className="md:!pt-3 !pt-11"
                    showLineNumbers={true}
                    wrapLines={true}
                    {...props}
                  >
                    {cleanCodeIndentation(codeContent)}
                  </SyntaxHighlighter>
                </div>
              );
            },
            h1: ({ children }) => <h1 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>{children}</h1>,
            h3: ({ children }) => <h3 style={{ color: 'var(--text-accent)', marginTop: '2rem' }}>{children}</h3>,
            h4: ({ children }) => <h4 style={{ color: 'var(--text-accent)', marginTop: '2rem' }}>{children}</h4>,
            p: ({ children, node }) => {
              const prevElement = node.prev;
              const isAfterHeading = prevElement && ['h1', 'h2', 'h3', 'h4'].includes(prevElement.tagName);
              const isAfterCode = prevElement && prevElement.tagName === 'code';
              
              return (
                <p style={{ 
                  color: 'var(--text-primary)', 
                  marginTop: isAfterHeading ? '0.75rem' : isAfterCode ? '2rem' : '1.5rem'
                }}>
                  {children}
                </p>
              );
            },
            li: ({ children, ordered, index, node }) => {
              // Calculate nesting level by counting parent <ul> or <ol> elements
              let level = 0;
              let parent = node.parent;
              while (parent) {
                if (parent.type === 'list') level++;
                parent = parent.parent;
              }

              return (
                <li 
                  className="relative"
                  style={{ 
                    color: 'var(--text-primary)',
                    marginLeft: `${level * 1.5}rem`,
                    paddingLeft: '1.5rem',
                    listStyleType: 'none',
                    position: 'relative'
                  }}
                >
                  <span 
                    className="absolute left-0 top-[0.6em] transform -translate-y-1/2"
                    style={{
                      color: 'var(--text-accent)',
                      opacity: 0.8
                    }}
                  >
                    {ordered ? `${index + 1}.` : '•'}
                  </span>
                  {children}
                </li>
              );
            },
            ul: ({ children }) => (
              <ul className="space-y-2 my-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="space-y-2 my-4">
                {children}
              </ol>
            ),
            strong: ({ children }) => <strong style={{ color: 'var(--text-accent)' }}>{children}</strong>,
            em: ({ children }) => <em style={{ color: 'var(--text-secondary)' }}>{children}</em>
          }}
        >
          {mainContent}
        </ReactMarkdown>
      </div>

      {/* Sections */}
      {sections.map((section, index) => {
        const isExpanded = expandedSections[index];
        
        return (
          <div 
            key={index}
            className="rounded-lg overflow-hidden border border-gray-700"
            style={{
              backgroundColor: 'var(--lesson-background)',
              borderColor: 'var(--card-border)'
            }}
          >
            {/* Section Title */}
            <button 
              onClick={() => toggleSection(index)}
              className="w-full border-b p-4 flex items-center justify-between cursor-pointer hover:bg-opacity-50 transition-colors"
              style={{
                backgroundColor: 'var(--lesson-background)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h2 className="text-2xl font-semibold m-0" style={{ color: 'var(--text-accent)' }}>{section.title}</h2>
              <div className="flex items-center gap-4">
                {/* Expand/Collapse Arrow */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </div>
            </button>
            
            {/* Section Content */}
            <div 
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}
            >
              <div className="p-4">
                <div className="" style={{ color: 'var(--text-primary)' }}>
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
                                backgroundColor: 'var(--inline-code-bg)',
                                color: 'var(--inline-code-color)',
                                padding: '0.2em 0.4em',
                                borderRadius: '0.2em',
                                fontSize: '0.9em',
                                fontWeight: '500'
                              }}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        }

                        return (
                          <div className="relative">
                            <button
                              onClick={() => handleCopyClick(codeContent, `${language}-${codeContent.slice(0, 20)}`)}
                              className="absolute right-2 top-2 p-1 rounded-md transition-all duration-200 hover:bg-opacity-80 flex items-center gap-2"
                              style={{ 
                                backgroundColor: 'var(--interactive-hover)',
                                color: 'var(--text-inverse)',
                                zIndex: 10
                              }}
                              title="Copy code"
                            >
                              {copiedStates[`${language}-${codeContent.slice(0, 20)}`] ? (
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-3 w-3" 
                                  viewBox="0 0 20 20" 
                                  fill="currentColor"
                                >
                                  <path 
                                    fillRule="evenodd" 
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                    clipRule="evenodd" 
                                  />
                                </svg>
                              ) : (
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-4 w-4" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                                  />
                                </svg>
                              )}
                            </button>
                            <SyntaxHighlighter
                              language={language}
                              style={currentTheme?.isDark ? vscDarkPlus : oneLight}
                              customStyle={{
                                margin: '0.5rem 0',
                                borderRadius: '0.5rem',
                                fontSize: '0.9em',
                                lineHeight: '1.5',
                                backgroundColor: 'var(--lesson-card-background)',
                                border: '1px solid var(--card-border)',
                                padding: '0.75rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                              }}
                              className="md:!pt-3 !pt-11"
                              showLineNumbers={true}
                              wrapLines={true}
                              {...props}
                            >
                              {cleanCodeIndentation(codeContent)}
                            </SyntaxHighlighter>
                          </div>
                        );
                      },
                      h1: ({ children }) => <h1 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>{children}</h1>,
                      h3: ({ children }) => <h3 style={{ color: 'var(--text-accent)', marginTop: '2rem' }}>{children}</h3>,
                      h4: ({ children }) => <h4 style={{ color: 'var(--text-accent)', marginTop: '2rem' }}>{children}</h4>,
                      p: ({ children, node }) => {
                        const prevElement = node.prev;
                        const isAfterHeading = prevElement && ['h1', 'h2', 'h3', 'h4'].includes(prevElement.tagName);
                        const isAfterCode = prevElement && prevElement.tagName === 'code';
                        
                        return (
                          <p style={{ 
                            color: 'var(--text-primary)', 
                            marginTop: isAfterHeading ? '0.75rem' : isAfterCode ? '2rem' : '1.5rem'
                          }}>
                            {children}
                          </p>
                        );
                      },
                      li: ({ children, ordered, index, node }) => {
                        // Calculate nesting level by counting parent <ul> or <ol> elements
                        let level = 0;
                        let parent = node.parent;
                        while (parent) {
                          if (parent.type === 'list') level++;
                          parent = parent.parent;
                        }

                        return (
                          <li 
                            className="relative"
                            style={{ 
                              color: 'var(--text-primary)',
                              marginLeft: `${level * 1.5}rem`,
                              paddingLeft: '1.5rem',
                              listStyleType: 'none',
                              position: 'relative'
                            }}
                          >
                            <span 
                              className="absolute left-0 top-[0.6em] transform -translate-y-1/2"
                              style={{
                                color: 'var(--text-accent)',
                                opacity: 0.8
                              }}
                            >
                              {ordered ? `${index + 1}.` : '•'}
                            </span>
                            {children}
                          </li>
                        );
                      },
                      ul: ({ children }) => (
                        <ul className="space-y-2 my-4">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="space-y-2 my-4">
                          {children}
                        </ol>
                      ),
                      strong: ({ children }) => <strong style={{ color: 'var(--text-accent)' }}>{children}</strong>,
                      em: ({ children }) => <em style={{ color: 'var(--text-secondary)' }}>{children}</em>
                    }}
                  >
                    {section.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 