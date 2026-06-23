import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Trash2,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'rejected';
  createdAt: string;
}

type FilterTab = 'all' | 'new' | 'contacted' | 'converted' | 'rejected';

const badgeStyles: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-amber-100 text-amber-700 border-amber-200',
  converted: 'bg-green-100 text-green-700 border-green-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
};

const tabConfig: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'converted', label: 'Converted' },
  { key: 'rejected', label: 'Rejected' },
];

export function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/inquiries`);
      if (!res.ok) throw new Error('Failed to fetch inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API}/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      await fetchInquiries();
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`${API}/api/inquiries/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete inquiry');
      await fetchInquiries();
    } catch (err: any) {
      alert(err.message || 'Failed to delete inquiry');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
        <p className="text-slate-600">{error}</p>
        <button
          onClick={fetchInquiries}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  const filtered =
    activeTab === 'all'
      ? inquiries
      : inquiries.filter((i) => i.status === activeTab);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">Inquiries</h1>
            <p className="text-sm text-slate-500">
              {inquiries.length} total {inquiries.length === 1 ? 'inquiry' : 'inquiries'}
            </p>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 md:mb-6 bg-slate-100 p-1 rounded-lg w-full md:w-fit overflow-x-auto hide-scrollbar">
        {tabConfig.map((tab) => {
          const count =
            tab.key === 'all'
              ? inquiries.length
              : inquiries.filter((i) => i.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Table & Cards */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-6 py-8 md:py-12 text-center text-slate-400">
            No inquiries found
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Name
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Email
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Phone
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 max-w-[200px]">
                    Message
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Date
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((inq) => (
                  <tr key={inq._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-medium text-slate-800 whitespace-nowrap">
                      {inq.name}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-600 whitespace-nowrap">
                      {inq.email}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-600 whitespace-nowrap">
                      {inq.phone || '—'}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-600 max-w-[200px]">
                      <button onClick={() => setSelectedMessage(inq.message)} className="block truncate hover:text-blue-600 cursor-pointer text-left w-full" title="Click to view">
                        {inq.message}
                      </button>
                    </td>
                    <td className="px-6 py-3.5">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className={`text-xs font-medium rounded-full px-3 py-1 border cursor-pointer appearance-none text-center ${badgeStyles[inq.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-500 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => handleDelete(inq._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-slate-100">
              {filtered.map((inq) => (
                <div key={inq._id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-start">
                    {/* Left Column */}
                    <div className="flex flex-col space-y-1.5 overflow-hidden">
                      <span className="text-sm font-semibold text-slate-800 truncate">{inq.name}</span>
                      <a href={`mailto:${inq.email}`} className="text-xs text-blue-600 truncate">{inq.email}</a>
                      <span className="text-xs text-slate-600 truncate">{inq.phone || '—'}</span>
                    </div>
                    
                    {/* Middle Column */}
                    <div className="flex flex-col space-y-1.5 overflow-hidden">
                      <button 
                        onClick={() => setSelectedMessage(inq.message)}
                        className="text-xs text-slate-700 text-left truncate italic hover:text-blue-600 bg-slate-100 rounded px-2 py-1"
                      >
                        {inq.message}
                      </button>
                      <span className="text-[10px] text-slate-500">
                        {new Date(inq.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <div>
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                          className={`text-[10px] font-medium rounded-full px-2 py-0.5 border cursor-pointer appearance-none ${badgeStyles[inq.status]}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Right Column - Action */}
                    <div className="flex flex-col items-end justify-center h-full">
                      <button
                        onClick={() => handleDelete(inq._id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50" onClick={() => setSelectedMessage(null)}>
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Message</h3>
            <div className="text-slate-600 text-sm whitespace-pre-wrap max-h-[60vh] overflow-y-auto p-3 bg-slate-50 rounded-lg border border-slate-100">
              {selectedMessage}
            </div>
            <button 
              onClick={() => setSelectedMessage(null)}
              className="mt-4 w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
