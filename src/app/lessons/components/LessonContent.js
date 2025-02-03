'use client'
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
            const codeContent = String(children).replace(/\n$/, '');
            
            // Handle all inline code and single-line code blocks the same way
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

            // Only use SyntaxHighlighter for multi-line code blocks
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
        {content}
      </ReactMarkdown>
    </article>
  );
} 