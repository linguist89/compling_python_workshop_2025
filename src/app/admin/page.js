export default function AdminPage() {
  return (
    <div style={{
      backgroundColor: 'var(--card-background)',
      borderColor: 'var(--card-border)',
      boxShadow: 'var(--card-shadow)'
    }} className="rounded-lg p-6 border">
      <h1 style={{
        background: 'var(--gradient-heading)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }} className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p style={{ color: 'var(--text-secondary)' }} className="mb-6">
        Welcome to the admin section. Here you can explore and manage various aspects of the website.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div style={{
          backgroundColor: 'var(--card-background)',
          borderColor: 'var(--card-border)',
          boxShadow: 'var(--card-shadow)'
        }} className="rounded-lg p-4 border hover:shadow-lg transition-shadow">
          <h2 style={{ color: 'var(--text-accent)' }} className="text-xl font-semibold mb-2">Components Library</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            View and interact with all the components used throughout the website.
            This helps maintain consistency and makes it easier to reuse components.
          </p>
        </div>
        {/* Add more admin sections here as needed */}
      </div>
    </div>
  );
} 