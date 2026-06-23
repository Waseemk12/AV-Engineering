import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Wrench, FolderKanban, ListTree, Menu, X } from 'lucide-react';
import { AdminLogin } from './AdminLogin';

export function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navLinks = (
    <>
      <li>
        <NavLink 
          to="/admin" 
          end
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/admin/inquiries" 
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
        >
          <MessageSquare className="w-5 h-5 mr-3" />
          Inquiries
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/admin/services" 
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
        >
          <Wrench className="w-5 h-5 mr-3" />
          Main Services
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/admin/all-services" 
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
        >
          <ListTree className="w-5 h-5 mr-3" />
          All Services
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/admin/projects" 
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
        >
          <FolderKanban className="w-5 h-5 mr-3" />
          Projects
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-20 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold text-blue-600">AV Engineering</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-800/50 z-30 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-16 md:p-6 border-b border-slate-200 flex items-center px-6 md:h-auto">
          <div>
            <h1 className="text-xl font-bold text-blue-600 hidden md:block">AV Engineering</h1>
            <p className="text-xs text-slate-500 mt-1">Admin Panel</p>
          </div>
          <button className="ml-auto md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navLinks}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-2">
          <a href="/" className="flex items-center px-3 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
            ← Back to Site
          </a>
          <button onClick={handleLogout} className="flex items-center px-3 text-sm font-medium text-red-500 hover:text-red-700 transition-colors w-full text-left">
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto mt-16 md:mt-0">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
