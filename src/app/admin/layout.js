import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/admin" className="flex items-center px-4 hover:text-blue-600">
                Admin Home
              </Link>
              <Link href="/admin/components" className="flex items-center px-4 hover:text-blue-600">
                Components
              </Link>
            </div>
            <Link href="/" className="flex items-center px-4 hover:text-blue-600">
              Back to Main Site
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 