export default function ProgressBar({ percentage, height = "8px" }) {
  return (
    <div 
      className="w-full rounded-full overflow-hidden"
      style={{ 
        backgroundColor: 'var(--card-background)',
        height,
        border: '1px solid var(--card-border)'
      }}
    >
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${Math.min(100, Math.max(0, percentage))}%`,
          background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
        }}
      />
    </div>
  );
} 