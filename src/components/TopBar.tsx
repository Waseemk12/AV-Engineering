import React from 'react';
import { Phone, Mail } from 'lucide-react';
export function TopBar() {
  return (
    <div className="bg-white text-slate-600 py-2 px-4 text-xs border-b border-slate-200 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <a
            href="tel:+1234567890"
            className="flex items-center hover:text-blue-600">
            
            <Phone className="w-3 h-3 mr-2" />
            Sales : +1 (555) 123-4567
          </a>
          <a
            href="mailto:contact@example.com"
            className="flex items-center hover:text-blue-600">
            
            <Mail className="w-3 h-3 mr-2" />
            contact@example.com
          </a>
        </div>
      </div>
    </div>);

}