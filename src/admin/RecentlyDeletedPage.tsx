import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

const API = import.meta.env.VITE_API_URL || '';

interface DeletedItem {
  _id: string;
  originalId: string;
  collectionName: string;
  data: any;
  deletedAt: string;
}

export function RecentlyDeletedPage() {
  const [items, setItems] = useState<DeletedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [actionItem, setActionItem] = useState<{ id: string, type: 'restore' | 'delete' } | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/deleted`);
      if (!res.ok) throw new Error('Failed to fetch deleted items');
      const data = await res.json();
      setItems(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const confirmAction = async () => {
    if (!actionItem) return;
    try {
      if (actionItem.type === 'restore') {
        const res = await fetch(`${API}/api/deleted/${actionItem.id}/restore`, { method: 'POST' });
        if (!res.ok) throw new Error('Failed to restore');
      } else {
        const res = await fetch(`${API}/api/deleted/${actionItem.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete permanently');
      }
      fetchItems();
    } catch (err: any) {
      alert(err.message);
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
        <button onClick={fetchItems} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Recently Deleted</h2>
          <p className="text-sm text-slate-500">Items deleted will be kept here for 30 days before permanent deletion.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <Trash2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          No recently deleted items.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Preview / Details</th>
                  <th className="px-6 py-3 font-semibold">Deleted On</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {items.map(item => {
                  let preview = '';
                  if (item.collectionName === 'Inquiry') preview = `${item.data.name} (${item.data.email})`;
                  else if (item.collectionName === 'Service') preview = item.data.title;
                  else if (item.collectionName === 'DetailedService') preview = `${item.data.category} - ${item.data.name}`;
                  else if (item.collectionName === 'Project') preview = `${item.data.name} (${item.data.location})`;

                  return (
                    <tr key={item._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-800">{item.collectionName.replace('DetailedService', 'Capability')}</td>
                      <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{preview}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(item.deletedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 flex items-center justify-end gap-3">
                        <button 
                          onClick={() => setActionItem({ id: item._id, type: 'restore' })}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                        >
                          <RotateCcw className="w-4 h-4" /> Restore
                        </button>
                        <button 
                          onClick={() => setActionItem({ id: item._id, type: 'delete' })}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={actionItem !== null}
        title={actionItem?.type === 'restore' ? "Restore Item" : "Permanently Delete"}
        message={actionItem?.type === 'restore' 
          ? "This will restore the item to its original location." 
          : "Are you sure? This action cannot be undone."}
        confirmText={actionItem?.type === 'restore' ? "Restore" : "Delete"}
        onConfirm={confirmAction}
        onCancel={() => setActionItem(null)}
      />
    </div>
  );
}
