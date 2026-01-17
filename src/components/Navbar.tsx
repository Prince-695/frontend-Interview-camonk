import { Button } from '@/components/ui/button';
import CreateBlogForm from './CreateBlogForm';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 right-0 w-full bg-white border-b border-gray-200 shadow-xs z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <GraduationCap className='text-white' />
            </div>
            <span className="text-xl font-bold text-gray-900">CA MONK</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Tools
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Practice
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Events
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Job Board
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Points
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <CreateBlogForm />
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-center">
              <p className='-mt-0.5'>Profile</p>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;