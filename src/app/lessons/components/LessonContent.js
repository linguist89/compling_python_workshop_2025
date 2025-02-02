import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

export default function LessonContent({ content }) {
  return (
    <article className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : 'text';
            
            if (inline) {
              return (
                <code
                  className={className}
                  style={{
                    backgroundColor: 'var(--color-secondary)',
                    padding: '0.2em 0.4em',
                    borderRadius: '0.25em',
                    fontSize: '0.875em'
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <SyntaxHighlighter
                language={language}
                PreTag="pre"
                style={{
                  margin: 0,
                  backgroundColor: 'var(--color-secondary)',
                  padding: '1em',
                  borderRadius: '0.5rem',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          },
          // Style other markdown elements
          h1: ({ children }) => (
            <h1 style={{ color: 'var(--text-accent)' }} className="text-3xl font-bold mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ color: 'var(--text-accent)' }} className="text-2xl font-bold mt-8 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ color: 'var(--text-accent)' }} className="text-xl font-semibold mt-6 mb-3">
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => {
            // Check if the children is a pre element (code block)
            if (children && typeof children === 'object' && children.type === 'pre') {
              return children; // Return the code block directly without wrapping in p
            }
            return (
              <p style={{ color: 'var(--text-secondary)' }} className="mb-4" {...props}>
                {children}
              </p>
            );
          },
          ul: ({ children }) => (
            <ul style={{ color: 'var(--text-secondary)' }} className="list-disc pl-6 mb-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{ color: 'var(--text-secondary)' }} className="list-decimal pl-6 mb-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-2">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeftColor: 'var(--text-accent)',
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--text-secondary)'
              }}
              className="pl-4 py-2 border-l-4 mb-4"
            >
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
} 