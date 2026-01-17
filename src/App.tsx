import { useState } from 'react';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';

const App = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>('1');

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Sticky */}
      <div className="sticky top-16 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CA Monk Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            {/* Left Panel - Blog List - Desktop only */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col min-h-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex-shrink-0">Latest Articles</h2>
              <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide min-h-0">
                <BlogList
                  selectedBlogId={selectedBlogId}
                  onSelectBlog={setSelectedBlogId}
                />
              </div>
            </div>

            {/* Right Panel - Blog Detail */}
            <div className="lg:col-span-7 xl:col-span-8 min-h-0">
              {selectedBlogId ? (
                <div className="bg-white rounded-lg shadow-sm h-full overflow-y-auto scrollbar-hide">
                  <BlogDetail blogId={selectedBlogId} />
                  
                  {/* Blog List for Mobile - Shows after blog detail content */}
                  <div className="lg:hidden px-8 py-8 border-t border-gray-200 bg-gray-50">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
                    <div className="space-y-4">
                      <BlogList
                        selectedBlogId={selectedBlogId}
                        onSelectBlog={setSelectedBlogId}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center h-full flex flex-col items-center justify-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a blog to read
                  </h3>
                  <p className="text-gray-600">
                    Choose an article from the list to view its full content
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;