import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { verifyUserIsTeacher } from '@/lib/auth';
import { generateTestStudents } from '@/lib/testDataGenerator';

export default function GenerateTestDataPopup({ isOpen, onClose }) {
  const [count, setCount] = useState(10);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!password.trim()) {
      setError('No password');
      setIsLoading(false);
      return;
    }

    try {
      if (password !== 'generate') {
        setError("Password doesn't match");
        setIsLoading(false);
        return;
      }

      const generatedCount = await generateTestStudents(count);
      toast.success(`Successfully generated ${generatedCount} test students`);
      onClose();
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="rounded-lg p-6 w-96 border shadow-lg"
        style={{ 
          backgroundColor: 'var(--color-background)',
          borderColor: 'var(--card-border)',
        }}
      >
        <h2 
          className="text-xl font-bold mb-4"
          style={{
            background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Generate Test Students
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Teacher Password:
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(''); // Clear error when user types
                }}
                className="block w-full px-3 py-2 rounded-md transition-colors duration-200 mb-1"
                style={{
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--text-primary)',
                  borderColor: error ? '#ef4444' : 'var(--card-border)',
                  border: '1px solid',
                }}
                placeholder="Enter password"
              />
              {error && (
                <div className="text-sm text-red-500 mb-3">
                  {error}
                </div>
              )}
            </div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Number of students to generate (1-100):
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? '' : parseInt(e.target.value)
                setCount(value === '' ? 10 : value)
              }}
              className="block w-full px-3 py-2 rounded-md transition-colors duration-200"
              style={{
                backgroundColor: 'var(--input-background)',
                color: 'var(--text-primary)',
                borderColor: 'var(--card-border)',
                border: '1px solid',
              }}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
              style={{
                backgroundColor: 'var(--color-hover)',
                color: 'var(--text-primary)',
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
              style={{
                background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
                color: 'white',
                opacity: isLoading ? 0.7 : 1,
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 