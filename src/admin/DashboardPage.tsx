import React, { useState, useEffect } from 'react';
import {
  Inbox,
  PhoneCall,
  CheckCircle2,
  XCircle,
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

const statusConfig = {
  new: { color: 'blue', icon: Inbox, label: 'New' },
  contacted: { color: 'amber', icon: PhoneCall, label: 'Contacted' },
  converted: { color: 'green', icon: CheckCircle2, label: 'Converted' },
  rejected: { color: 'red', icon: XCircle, label: 'Rejected' },
} as const;

const cardStyles: Record<string, { bg: string; iconBg: string; text: string; count: string }> = {
  blue: {
    bg: 'bg-blue-50 border-blue-100',
    iconBg: 'bg-blue-100 text-blue-600',
    text: 'text-blue-600',
    count: 'text-blue-700',
  },
  amber: {
    bg: 'bg-amber-50 border-amber-100',
    iconBg: 'bg-amber-100 text-amber-600',
    text: 'text-amber-600',
    count: 'text-amber-700',
  },
  green: {
    bg: 'bg-green-50 border-green-100',
    iconBg: 'bg-green-100 text-green-600',
    text: 'text-green-600',
    count: 'text-green-700',
  },
  red: {
    bg: 'bg-red-50 border-red-100',
    iconBg: 'bg-red-100 text-red-600',
    text: 'text-red-600',
    count: 'text-red-700',
  },
};

const badgeStyles: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  converted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export function DashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const counts = {
    new: inquiries.filter((i) => i.status === 'new').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
    converted: inquiries.filter((i) => i.status === 'converted').length,
    rejected: inquiries.filter((i) => i.status === 'rejected').length,
  };

  const recentInquiries = [...inquiries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div>
      {/* Page header */}
      <div className="mb-4 md:mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of your business inquiries
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">
        {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((key) => {
          const config = statusConfig[key];
          const style = cardStyles[config.color];
          const Icon = config.icon;
          return (
            <div
              key={key}
              className={`rounded-xl border p-3 sm:p-4 transition-shadow hover:shadow-md ${style.bg}`}
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${style.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${style.count}`}>{counts[key]}</p>
              <p className={`text-xs md:text-sm font-medium mt-1 ${style.text}`}>{config.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Recent Inquiries</h2>
        </div>
        {recentInquiries.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400">
            No inquiries yet
          </div>
        ) : (
          <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Name
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Email
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentInquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-medium text-slate-800">
                      {inq.name}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-600">{inq.email}</td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyles[inq.status]}`}
                      >
                        {inq.status.charAt(0).toUpperCase() + inq.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-500">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden divide-y divide-slate-100">
            {recentInquiries.map((inq) => (
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
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${badgeStyles[inq.status]}`}>
                        {inq.status.charAt(0).toUpperCase() + inq.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Right Column - Action */}
                  <div className="flex flex-col items-end justify-center h-full">
                    {/* No delete action on Dashboard, just a placeholder or icon to view */}
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
