export default function LessonNavigation({ lessons, selectedLesson, onSelectLesson }) {
  return (
    <nav 
      className="rounded-lg p-4"
      style={{
        backgroundColor: 'var(--card-background)',
        borderColor: 'var(--card-border)',
        border: '1px solid'
      }}
    >
      <h2 
        className="text-xl font-semibold mb-4"
        style={{ color: 'var(--text-accent)' }}
      >
        Lessons
      </h2>
      <ul className="space-y-2">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <button
              onClick={() => onSelectLesson(lesson.id)}
              className={`w-full text-left px-4 py-2 rounded transition-all ${
                selectedLesson === lesson.id ? 'font-medium' : ''
              }`}
              style={{
                backgroundColor: selectedLesson === lesson.id ? 'var(--color-secondary)' : 'transparent',
                color: selectedLesson === lesson.id ? 'var(--text-inverse)' : 'var(--text-secondary)',
              }}
            >
              {lesson.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
} 