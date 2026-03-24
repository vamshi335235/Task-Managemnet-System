import React, { useState, useEffect } from 'react';
import { LogOut, CheckSquare, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference from localStorage
    const savedMode = localStorage.getItem('darkMode') === 'true';
    if (savedMode) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newState = !isDark;
    setIsDark(newState);
    localStorage.setItem('darkMode', newState);
    
    if (newState) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <CheckSquare size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">TaskFlow</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 transition-colors"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2 px-3 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut size={18} />
              <span className="font-medium text-sm hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
