import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ children, projectName, user, userProjects, onLoginClick, onLogoutClick, onSelectProject }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      <Sidebar user={user} userProjects={userProjects} onLogoutClick={onLogoutClick} onSelectProject={onSelectProject} />
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <Navbar projectName={projectName} user={user} onLoginClick={onLoginClick} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
