import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Wrench, FolderKanban, ListTree } from 'lucide-react';
import { AdminLogin } from './AdminLogin';

export function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-blue-600">AV Engineering</h1>
          <p className="text-xs text-slate-500 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <NavLink 
                to="/admin" 
                end
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/inquiries" 
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Inquiries
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/services" 
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                <Wrench className="w-5 h-5 mr-3" />
                Services
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/all-services" 
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                <ListTree className="w-5 h-5 mr-3" />
                All Services
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/projects" 
                className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                <FolderKanban className="w-5 h-5 mr-3" />
                Projects
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-2">
          <a href="/" className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
            ← Back to Site
          </a>
          <a href="#" onClick={handleLogout} className="flex items-center text-sm font-medium text-red-500 hover:text-red-700 transition-colors">
            Logout
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
