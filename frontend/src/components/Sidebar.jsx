import React from 'react';
import { LayoutDashboard, FolderKanban, Settings, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = ({ user, userProjects = [], onLogoutClick, onSelectProject }) => {
  return (
    <div className="w-64 bg-[#1e293b] text-slate-300 flex flex-col h-screen fixed top-0 left-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-500 p-2 rounded-lg">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">System Design</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
          Workspaces
        </div>
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl font-medium transition-colors">
          <FolderKanban className="w-5 h-5" />
          Current Project
        </a>

        {user && userProjects.length > 0 && (
           <div className="mt-6">
             <div className="px-4 py-2 mt-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
               Cloud Save History
             </div>
             {userProjects.map((proj) => (
                <button 
                  key={proj.id} 
                  onClick={() => onSelectProject(proj)}
                  className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors text-sm truncate"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  {proj.name}
                </button>
             ))}
           </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors mb-2">
          <HelpCircle className="w-5 h-5" />
          Help & Support
        </a>
        {user && (
          <button 
            onClick={onLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout User
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
