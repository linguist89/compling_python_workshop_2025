export default function AdminPage() {
  return (
    <div className="bg-[#112240] shadow rounded-lg p-6 border border-[#00E6E620]">
      <h1 className="text-3xl font-bold text-[#00E6E6] mb-4">Admin Dashboard</h1>
      <p className="text-[#B8D4D4] mb-6">
        Welcome to the admin section. Here you can explore and manage various aspects of the website.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-[#00E6E620] rounded-lg p-4 bg-[#0A192F] hover:shadow-[0_8px_30px_rgba(0,230,230,0.2)] transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-[#00E6E6]">Components Library</h2>
          <p className="text-[#B8D4D4]">
            View and interact with all the components used throughout the website.
            This helps maintain consistency and makes it easier to reuse components.
          </p>
        </div>
        {/* Add more admin sections here as needed */}
      </div>
    </div>
  );
} 