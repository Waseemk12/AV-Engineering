import React, { useState } from 'react';
import { Flame, Shield, Wrench, Settings, Droplet, Wind, Lock, Video, Bell, HardHat, Speaker, Thermometer, Factory } from 'lucide-react';

const categories = [
  {
    title: "Fire Protection System",
    icon: <Flame className="w-8 h-8 text-red-500 mb-4" />,
    color: "bg-red-50 hover:bg-red-100 border-red-200 text-red-700",
    items: [
      { name: "Water-Based System", icon: <Droplet className="w-4 h-4 mr-2" /> },
      { name: "Hydrant System", icon: <Droplet className="w-4 h-4 mr-2" /> },
      { name: "Sprinkles System", icon: <Droplet className="w-4 h-4 mr-2" /> },
      { name: "MVWS & HVWS System", icon: <Settings className="w-4 h-4 mr-2" /> },
      { name: "Foam System", icon: <Droplet className="w-4 h-4 mr-2" /> },
      { name: "Gas Suppression System", icon: <Wind className="w-4 h-4 mr-2" /> },
      { name: "Co2/FM-200/Inergen", icon: <Wind className="w-4 h-4 mr-2" /> },
      { name: "Fire Detection & Alarm", icon: <Bell className="w-4 h-4 mr-2" /> },
    ]
  },
  {
    title: "Security System",
    icon: <Shield className="w-8 h-8 text-blue-500 mb-4" />,
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700",
    items: [
      { name: "Access Control System", icon: <Lock className="w-4 h-4 mr-2" /> },
      { name: "Video Surveillance System", icon: <Video className="w-4 h-4 mr-2" /> },
      { name: "Intrusion Alarm System", icon: <Bell className="w-4 h-4 mr-2" /> },
      { name: "Perimeter Protection", icon: <Shield className="w-4 h-4 mr-2" /> },
      { name: "Public Address System", icon: <Speaker className="w-4 h-4 mr-2" /> },
    ]
  },
  {
    title: "Process & Utility Piping System",
    icon: <Settings className="w-8 h-8 text-emerald-500 mb-4" />,
    color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700",
    items: [
      { name: "Compressed Air Piping", icon: <Wind className="w-4 h-4 mr-2" /> },
      { name: "IBR Steam Piping", icon: <Thermometer className="w-4 h-4 mr-2" /> },
      { name: "Fuel Transfer System", icon: <Factory className="w-4 h-4 mr-2" /> },
      { name: "Chilled Water Piping", icon: <Droplet className="w-4 h-4 mr-2" /> },
      { name: "Sewage Transfer System", icon: <Droplet className="w-4 h-4 mr-2" /> },
      { name: "Hot & Cold Acoustic Insulation", icon: <Thermometer className="w-4 h-4 mr-2" /> },
      { name: "Falls ceiling Insulation", icon: <HardHat className="w-4 h-4 mr-2" /> },
    ]
  },
  {
    title: "Heavy Engineering Fabrication",
    icon: <Wrench className="w-8 h-8 text-orange-500 mb-4" />,
    color: "bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700",
    items: [
      { name: "Pipe Rack & Super Structures", icon: <HardHat className="w-4 h-4 mr-2" /> },
      { name: "Tank & Vessel Manufacturing", icon: <Factory className="w-4 h-4 mr-2" /> },
      { name: "Tower & Chimney Manufacturing", icon: <Factory className="w-4 h-4 mr-2" /> },
    ]
  }
];

export function DetailedServices() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Comprehensive Solutions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From heavy engineering to intelligent security, we provide an extensive range of specialized services tailored to meet the highest industry standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              onMouseEnter={() => setHoveredCategory(idx)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-xl ${category.color} mr-6 transition-transform duration-300 ${hoveredCategory === idx ? 'scale-110' : ''}`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    className={`flex items-center px-4 py-2 rounded-full border text-sm font-medium transition-colors cursor-default ${category.color.split(' ')[0]} ${category.color.split(' ')[1]} ${category.color.split(' ')[2]} ${category.color.split(' ')[3]}`}
                  >
                    {item.icon}
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
