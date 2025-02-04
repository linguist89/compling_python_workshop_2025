import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function ResourcesPopup({ show, onClose }) {
  const [copied, setCopied] = useState(false);
  const { currentTheme } = useTheme() || { currentTheme: { isDark: true } };
  const command = 'wget https://compling-ws-2025.netlify.app/data/height-weight.csv';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="relative rounded-lg p-6 max-w-2xl w-full mx-4"
        style={{
          backgroundColor: 'var(--card-background)',
          borderColor: 'var(--card-border)',
          border: '1px solid'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 
          className="text-2xl font-semibold mb-4"
          style={{ color: 'var(--text-accent)' }}
        >
          Download Resources
        </h2>

        <h3 
          className="text-xl font-semibold mb-2"
          style={{ color: 'var(--text-accent)' }}
        >
          Health Weight Dataset
        </h3>

        <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
          A dataset containing height and weight measurements, along with city residency information.
        </p>

        <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
          Use the following command to download the dataset:
        </p>

        <div className="relative">
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 p-1 rounded-md transition-all duration-200 hover:bg-opacity-80 flex items-center gap-2 z-10"
            style={{ 
              backgroundColor: 'var(--interactive-hover)',
              color: 'var(--text-inverse)'
            }}
            title="Copy code"
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
              </svg>
            )}
          </button>
          <SyntaxHighlighter
            language="bash"
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
          >
            {command}
          </SyntaxHighlighter>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 