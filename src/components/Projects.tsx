import React, { useState, useEffect } from 'react';
import { MapPin, Activity, CheckCircle2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '';

interface ProjectItem {
  _id?: string;
  name: string;
  location: string;
  status: 'ongoing' | 'completed';
}

const fallbackRunning = [
  { name: "Logos logistics Park", location: "Chakhan" },
  { name: "Igcl", location: "Vapi" },
  { name: "Kirloskar", location: "Sholapur" },
];

const fallbackCompleted = [
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
  const [runningProjects, setRunningProjects] = useState(fallbackRunning);
  const [completedProjects, setCompletedProjects] = useState(fallbackCompleted);

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then(res => res.json())
      .then((data: ProjectItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const ongoing = data
            .filter(p => p.status === 'ongoing')
            .map(p => ({ name: p.name, location: p.location }));
          const completed = data
            .filter(p => p.status === 'completed')
            .map(p => `${p.name}, ${p.location}`);
          if (ongoing.length > 0) setRunningProjects(ongoing);
          if (completed.length > 0) setCompletedProjects(completed);
        }
      })
      .catch(() => {
        // Use fallback data
      });
  }, []);

  return (
    <section className="py-24 bg-white border-t border-slate-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Projects Portfolio
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From active sites to our proud legacy, we have engineered safety solutions for industry leaders across the nation.
          </p>
        </div>

        {/* Running Projects */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8 pb-4 border-b border-slate-100">
            <Activity className="text-blue-600 w-6 h-6 mr-3" />
            <h3 className="text-2xl font-bold text-slate-800">Active Sites</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {runningProjects.map((project, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                    </span>
                    <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">In Progress</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2 relative z-10">{project.name}</h4>
                <div className="flex items-center text-slate-500 text-sm relative z-10">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{project.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee for Completed Projects */}
      <div className="relative bg-slate-50 py-12 border-y border-slate-200">
        <div className="flex items-center justify-center mb-8">
          <CheckCircle2 className="text-slate-600 w-6 h-6 mr-3" />
          <h3 className="text-2xl font-bold text-slate-800">Completed Projects</h3>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="flex overflow-hidden whitespace-nowrap relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-marquee w-max">
            {[...completedProjects, ...completedProjects].map((project, idx) => (
              <div 
                key={idx}
                className="inline-flex items-center mx-4 px-6 py-2 bg-white border border-slate-200 rounded-md text-slate-600 text-sm font-medium hover:border-slate-300 transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3"></span>
                <span>{project}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
