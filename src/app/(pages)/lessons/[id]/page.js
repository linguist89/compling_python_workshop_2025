import { notFound } from 'next/navigation';
import { getMarkdownContent, getAllMarkdownFiles } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Generate static params for all markdown files
export async function generateStaticParams() {
  const files = getAllMarkdownFiles();
  return files.map((file) => ({
    id: file.id,
  }));
}

export default async function LessonPage({ params }) {
  const { id } = params;
  const lesson = getMarkdownContent(id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg prose-invert max-w-none rounded-lg p-8 prose-code:text-pink-300 prose-pre:bg-gray-800">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg !bg-gray-800 !mt-0"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props} className={`${className} bg-gray-800 px-1.5 py-0.5 rounded text-pink-300`}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
} 