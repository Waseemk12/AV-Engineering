import React, { useState, useEffect } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-slate-200 shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#">
              <img
                className="h-48 w-auto object-contain -my-12"
                src="/logo.png"
                alt="AV Engineering Logo" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}