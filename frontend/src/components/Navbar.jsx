import React from 'react';
import { Bell, Search } from 'lucide-react';

const Navbar = ({ projectName, user, onLoginClick }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-gray-500">
          Projects / {projectName || "New Workspace"}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          {user ? (
            <>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center text-sm font-bold shadow-sm uppercase">
                {user.email.substring(0,2)}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">{user.email}</div>
                <div className="text-xs text-gray-500">Pro Member</div>
              </div>
            </>
          ) : (
            <button 
              onClick={onLoginClick}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
