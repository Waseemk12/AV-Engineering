import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Plus, Trash2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '';

interface DetailedService {
  _id: string;
  category: string;
  name: string;
  icon: string;
}

const CATEGORIES = [
  "Fire Protection System",
  "Security System",
  "Process & Utility Piping System",
  "Heavy Engineering Fabrication"
];

const ICONS = ["Flame", "Shield", "Wrench", "Settings", "Droplet", "Wind", "Lock", "Video", "Bell", "HardHat", "Speaker", "Thermometer", "Factory", "Activity"];

export function AllServicesPage() {
  const [services, setServices] = useState<DetailedService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('Activity');

  const fetchServices = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/detailed-services`);
      if (!res.ok) throw new Error('Failed to load services');
      const data = await res.json();
      setServices(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/detailed-services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: newCategory, name: newName, icon: newIcon }),
      });
      if (!res.ok) throw new Error('Failed to add service');
      setNewName('');
      setShowAddForm(false);
      fetchServices();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this capability?')) return;
    try {
      const res = await fetch(`${API}/api/detailed-services/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchServices();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  if (error) return (
    <div className="bg-red-50 text-red-700 p-4 rounded-md flex items-center justify-between">
      <div className="flex items-center"><AlertCircle className="w-5 h-5 mr-2" /> {error}</div>
      <button onClick={fetchServices} className="text-sm font-medium hover:underline">Retry</button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">All Services (Capabilities)</h2>
          <p className="text-slate-500">Manage comprehensive capabilities shown on the frontend.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Capability
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-slate-200 mb-4 md:mb-6 md:mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Add New Capability</h3>
          <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-4">
            <div className="w-full md:w-auto flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="w-full md:w-auto flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                required
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Laser Tag System"
                className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-full md:w-auto flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
              <select
                value={newIcon}
                onChange={e => setNewIcon(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-900 transition-colors"
            >
              Save
            </button>
          </form>
        </div>
      )}

      {services.length === 0 ? (
        <div className="text-center py-8 md:py-12 bg-white rounded-lg border border-slate-200 text-slate-500">
          No capabilities found. Add one above! Note: Fallback data is shown on the frontend until you add the first one here.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:p-6">
          {CATEGORIES.map(cat => {
            const catServices = services.filter(s => s.category === cat);
            if (catServices.length === 0) return null;
            return (
              <div key={cat} className="bg-white rounded-lg border border-slate-200 p-4 md:p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">{cat}</h3>
                <ul className="space-y-2">
                  {catServices.map(s => (
                    <li key={s._id} className="flex justify-between items-center text-sm text-slate-600 bg-slate-50 p-2 rounded-md">
                      <div className="flex items-center">
                        <span className="bg-slate-200 text-xs px-2 py-1 rounded mr-2 font-medium">{s.icon}</span>
                        {s.name}
                      </div>
                      <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:text-red-700 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
