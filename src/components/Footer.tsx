import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Left Column */}
          <div className="md:w-5/12 mb-8 md:mb-0">
            <img
              src="/logo-av.png"
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
              <p>Sales : <a href="tel:+917410176954" className="text-blue-600 hover:underline">+91 7410176954</a></p>
              <p>Email : <a href="mailto:avengineeringandcompany@gmail.com" className="text-blue-600 hover:underline">avengineeringandcompany@gmail.com</a></p>
              <p className="mt-4 leading-relaxed">
                S No. 284/1, Flat No. B/309 Silver Treasure,<br />
                Mawal, Pune, Talegaon Dhabade, 412106
              </p>
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