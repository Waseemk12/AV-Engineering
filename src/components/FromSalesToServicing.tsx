import React from 'react';
import { ShieldCheck, History, ShieldAlert } from 'lucide-react';

export function FromSalesToServicing() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column: Text & Features */}
          <div className="mb-12 lg:mb-0">
            <h2 className="text-4xl font-bold text-slate-800 mb-10 leading-tight">
              From Sales to Servicing and Beyond We Are Here for You
            </h2>
            
            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="flex">
                <div className="flex-shrink-0 mr-5 mt-1">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h6 className="text-xl font-bold text-slate-800 mb-2">Increased Safety</h6>
                  <p className="text-slate-600 leading-relaxed text-justify">
                    We provide solutions that are sustainable, and help companies achieve their safety goals.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex">
                <div className="flex-shrink-0 mr-5 mt-1">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-orange-500">
                    <History className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h6 className="text-xl font-bold text-slate-800 mb-2">Be a Part of History</h6>
                  <p className="text-slate-600 leading-relaxed text-justify">
                    AV Engineering has over 20 years of experience, enabling us to be a part of your legacy with our expertise.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex">
                <div className="flex-shrink-0 mr-5 mt-1">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-green-600">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h6 className="text-xl font-bold text-slate-800 mb-2">Risk Elimination</h6>
                  <p className="text-slate-600 leading-relaxed text-justify">
                    Get products and services that are designed with safety in mind. Reach a step closer to risk elimination with our help.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Graphic */}
          <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden flex justify-center items-center">
            <img 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Industrial Engineering Map" 
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
