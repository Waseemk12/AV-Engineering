import React, { useState, useEffect } from 'react';
import { Flame, Shield, Wrench, Settings, Droplet, Wind, Lock, Video, Bell, HardHat, Speaker, Thermometer, Factory, Activity } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '';

// Map icon strings to lucide-react components
const iconMap: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-6 h-6 text-slate-700" />,
  Shield: <Shield className="w-6 h-6 text-slate-700" />,
  Wrench: <Wrench className="w-6 h-6 text-slate-700" />,
  Settings: <Settings className="w-6 h-6 text-slate-700" />,
  Droplet: <Droplet className="w-4 h-4 mr-2 text-slate-400" />,
  Wind: <Wind className="w-4 h-4 mr-2 text-slate-400" />,
  Lock: <Lock className="w-4 h-4 mr-2 text-slate-400" />,
  Video: <Video className="w-4 h-4 mr-2 text-slate-400" />,
  Bell: <Bell className="w-4 h-4 mr-2 text-slate-400" />,
  HardHat: <HardHat className="w-4 h-4 mr-2 text-slate-400" />,
  Speaker: <Speaker className="w-4 h-4 mr-2 text-slate-400" />,
  Thermometer: <Thermometer className="w-4 h-4 mr-2 text-slate-400" />,
  Factory: <Factory className="w-4 h-4 mr-2 text-slate-400" />,
  Activity: <Activity className="w-4 h-4 mr-2 text-slate-400" />
};

interface DetailedServiceItem {
  _id?: string;
  category: string;
  name: string;
  icon: string;
}

const fallbackItems: DetailedServiceItem[] = [
  { category: "Fire Protection System", name: "Water-Based System", icon: "Droplet" },
  { category: "Fire Protection System", name: "Hydrant System", icon: "Droplet" },
  { category: "Fire Protection System", name: "Sprinkles System", icon: "Droplet" },
  { category: "Fire Protection System", name: "MVWS & HVWS System", icon: "Settings" },
  { category: "Fire Protection System", name: "Foam System", icon: "Droplet" },
  { category: "Fire Protection System", name: "Gas Suppression System", icon: "Wind" },
  { category: "Fire Protection System", name: "Co2/FM-200/Inergen", icon: "Wind" },
  { category: "Fire Protection System", name: "Fire Detection & Alarm", icon: "Bell" },
  
  { category: "Security System", name: "Access Control System", icon: "Lock" },
  { category: "Security System", name: "Video Surveillance System", icon: "Video" },
  { category: "Security System", name: "Intrusion Alarm System", icon: "Bell" },
  { category: "Security System", name: "Perimeter Protection", icon: "Shield" },
  { category: "Security System", name: "Public Address System", icon: "Speaker" },
  
  { category: "Process & Utility Piping System", name: "Compressed Air Piping", icon: "Wind" },
  { category: "Process & Utility Piping System", name: "IBR Steam Piping", icon: "Thermometer" },
  { category: "Process & Utility Piping System", name: "Fuel Transfer System", icon: "Factory" },
  { category: "Process & Utility Piping System", name: "Chilled Water Piping", icon: "Droplet" },
  { category: "Process & Utility Piping System", name: "Sewage Transfer System", icon: "Droplet" },
  { category: "Process & Utility Piping System", name: "Hot & Cold Acoustic Insulation", icon: "Thermometer" },
  { category: "Process & Utility Piping System", name: "Falls ceiling Insulation", icon: "HardHat" },
  
  { category: "Heavy Engineering Fabrication", name: "Pipe Rack & Super Structures", icon: "HardHat" },
  { category: "Heavy Engineering Fabrication", name: "Tank & Vessel Manufacturing", icon: "Factory" },
  { category: "Heavy Engineering Fabrication", name: "Tower & Chimney Manufacturing", icon: "Factory" }
];

const categoryIcons: Record<string, string> = {
  "Fire Protection System": "Flame",
  "Security System": "Shield",
  "Process & Utility Piping System": "Settings",
  "Heavy Engineering Fabrication": "Wrench"
};

export function DetailedServices() {
  const [items, setItems] = useState<DetailedServiceItem[]>(fallbackItems);

  useEffect(() => {
    fetch(`${API}/api/detailed-services`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {
        // Use fallback data
      });
  }, []);

  // Group items by category
  const categoriesMap = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = {
        title: item.category,
        iconString: categoryIcons[item.category] || 'Activity',
        items: []
      };
    }
    acc[item.category].items.push(item);
    return acc;
  }, {} as Record<string, { title: string, iconString: string, items: DetailedServiceItem[] }>);

  const categories = Object.values(categoriesMap);

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
                  {iconMap[category.iconString] || iconMap['Activity']}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
              </div>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {category.items.map((item, itemIdx) => (
                  <li 
                    key={itemIdx}
                    className="flex items-center text-slate-600 text-sm font-medium"
                  >
                    {iconMap[item.icon] || iconMap['Activity']}
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
