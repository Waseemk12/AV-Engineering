import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Left Column */}
          <div className="md:w-5/12 mb-8 md:mb-0">
            <img
              src="/logo.png"
              alt="AV Engineering Logo"
              className="max-h-24 mb-6 object-contain"
            />
            <p className="text-slate-600 text-sm leading-relaxed text-justify">
              Our client base comprises the most trusted organisations and we aim to offer the finest customer service. We offer quality products and services at reasonable prices, provide unparalleled technical assistance, and back it all up with outstanding customer support.
            </p>
          </div>

          {/* Right Column */}
          <div className="md:w-5/12 ml-auto">
            <h4 className="text-xl font-bold text-slate-800 mb-6">Contact us</h4>
            <div className="text-slate-600 text-sm leading-loose mb-6">
              <p>Sales : <a href="tel:+15551234567" className="text-blue-600 hover:underline">+1 (555) 123-4567</a></p>
              <p>Email : <a href="mailto:contact@example.com" className="text-blue-600 hover:underline">contact@example.com</a></p>
              <p className="mt-4 leading-relaxed">
                123 Generic Street, Suite 100<br />
                Business District<br />
                Cityville, State 12345, US
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-700 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-pink-600 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-red-600 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Copyright &copy; {new Date().getFullYear()} AV Engineering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}