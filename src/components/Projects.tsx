import React from 'react';
import { MapPin, Activity, CheckCircle2 } from 'lucide-react';

const runningProjects = [
  { name: "Logos logistics Park", location: "Chakhan" },
  { name: "Igcl", location: "Vapi" },
  { name: "Kirloskar", location: "Sholapur" },
];

const completedProjects = [
  "Nagpur police housing",
  "Logos logistics Park, Chennai",
  "Weg India, Hosur",
  "ASB International Pvt Ltd, Amarnath, Mumbai",
  "Navin Floring Dahej, Gujarat",
  "Astral pipe, Dahej",
  "Asian Paints, Sirwal Khandla",
  "Xigo Logistic Park, Nagpur",
  "KSH International, Pune",
  "Finolex Cable, Urse Pune",
  "Eaton, Ahmad Nagar",
  "Mass housing, Mulund",
  "Mahindra, Chakhan Pune",
  "Ksh international, Supa",
  "John Deer, Sansbadi",
  "Welspun Logistics Park, Thane"
];

export function Projects() {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2 block">Our Impact</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Projects We've Empowered
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From active sites to our proud legacy, we've secured and engineered solutions for industry leaders across the nation.
          </p>
        </div>

        {/* Running Projects */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <Activity className="text-emerald-400 w-6 h-6 mr-3 animate-pulse" />
            <h3 className="text-2xl font-semibold text-emerald-400">Active Sites</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {runningProjects.map((project, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 group-hover:w-full transition-all duration-500 opacity-10"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <span className="relative flex h-3 w-3 mr-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-500 text-sm font-medium uppercase tracking-wider">In Progress</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 relative z-10">{project.name}</h4>
                <div className="flex items-center text-slate-400 relative z-10">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{project.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee for Completed Projects */}
      <div className="relative">
        <div className="flex items-center justify-center mb-8">
          <CheckCircle2 className="text-blue-400 w-6 h-6 mr-3" />
          <h3 className="text-2xl font-semibold text-blue-400">Our Legacy</h3>
        </div>
        
        {/* CSS for marquee is added inline here for simplicity */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="flex overflow-hidden whitespace-nowrap relative w-full bg-slate-800/30 py-8 border-y border-slate-800">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-marquee w-max">
            {/* Double the array for seamless infinite scrolling */}
            {[...completedProjects, ...completedProjects].map((project, idx) => (
              <div 
                key={idx}
                className="inline-flex items-center mx-4 px-6 py-3 bg-slate-800 border border-slate-700 rounded-full hover:border-blue-500 transition-colors hover:text-blue-400 cursor-default"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <span className="font-medium">{project}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
