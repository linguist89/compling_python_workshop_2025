import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A192F]">
      <nav className="bg-[#112240] border-b border-[#00E6E620] shadow-[0_4px_20px_rgba(0,230,230,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link 
                href="/admin" 
                className="flex items-center px-4 text-[#B8D4D4] hover:text-[#00E6E6] transition-colors"
              >
                Admin Home
              </Link>
              <Link 
                href="/admin/siteComponents" 
                className="flex items-center px-4 text-[#B8D4D4] hover:text-[#00E6E6] transition-colors"
              >
                Components
              </Link>
            </div>
            <Link 
              href="/" 
              className="flex items-center px-4 text-[#B8D4D4] hover:text-[#00E6E6] transition-colors"
            >
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