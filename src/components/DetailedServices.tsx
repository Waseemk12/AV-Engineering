import React, { useState } from 'react';
import { Flame, Shield, Wrench, Settings, Droplet, Wind, Lock, Video, Bell, HardHat, Speaker, Thermometer, Factory } from 'lucide-react';

const categories = [
  {
    title: "Fire Protection System",
    icon: <Flame className="w-6 h-6 text-slate-700" />,
    items: [
      { name: "Water-Based System", icon: <Droplet className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Hydrant System", icon: <Droplet className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Sprinkles System", icon: <Droplet className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "MVWS & HVWS System", icon: <Settings className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Foam System", icon: <Droplet className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Gas Suppression System", icon: <Wind className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Co2/FM-200/Inergen", icon: <Wind className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Fire Detection & Alarm", icon: <Bell className="w-4 h-4 mr-2 text-slate-400" /> },
    ]
  },
  {
    title: "Security System",
    icon: <Shield className="w-6 h-6 text-slate-700" />,
    items: [
      { name: "Access Control System", icon: <Lock className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Video Surveillance System", icon: <Video className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Intrusion Alarm System", icon: <Bell className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Perimeter Protection", icon: <Shield className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Public Address System", icon: <Speaker className="w-4 h-4 mr-2 text-slate-400" /> },
    ]
  },
  {
    title: "Process & Utility Piping System",
    icon: <Settings className="w-6 h-6 text-slate-700" />,
    items: [
      { name: "Compressed Air Piping", icon: <Wind className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "IBR Steam Piping", icon: <Thermometer className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Fuel Transfer System", icon: <Factory className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Chilled Water Piping", icon: <Droplet className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Sewage Transfer System", icon: <Droplet className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Hot & Cold Acoustic Insulation", icon: <Thermometer className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Falls ceiling Insulation", icon: <HardHat className="w-4 h-4 mr-2 text-slate-400" /> },
    ]
  },
  {
    title: "Heavy Engineering Fabrication",
    icon: <Wrench className="w-6 h-6 text-slate-700" />,
    items: [
      { name: "Pipe Rack & Super Structures", icon: <HardHat className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Tank & Vessel Manufacturing", icon: <Factory className="w-4 h-4 mr-2 text-slate-400" /> },
      { name: "Tower & Chimney Manufacturing", icon: <Factory className="w-4 h-4 mr-2 text-slate-400" /> },
    ]
  }
];

export function DetailedServices() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Comprehensive Capabilities
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From heavy engineering to intelligent security, we provide an extensive range of specialized services tailored to meet the highest industry standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm"
            >
              <div className="flex items-center mb-6 pb-4 border-b border-slate-100">
                <div className="p-3 bg-slate-100 rounded-md mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
              </div>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {category.items.map((item, itemIdx) => (
                  <li 
                    key={itemIdx}
                    className="flex items-center text-slate-600 text-sm font-medium"
                  >
                    {item.icon}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
