export default function AdminPage() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to the admin section. Here you can explore and manage various aspects of the website.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Components Library</h2>
          <p className="text-gray-600">
            View and interact with all the components used throughout the website.
            This helps maintain consistency and makes it easier to reuse components.
          </p>
        </div>
        {/* Add more admin sections here as needed */}
      </div>
    </div>
  );
} 