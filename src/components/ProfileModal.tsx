import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { getAuthHeader, user } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      setLoading(true);
      const auth = await getAuthHeader();
      const res = await fetch(`${API_BASE}/api/profile/me`, {
        headers: { ...(auth ? { Authorization: auth } : {}) }
      });
      const data = await res.json();
      if (data?.profile) {
        setDisplayName(data.profile.display_name || '');
        setPhone(data.profile.phone || '');
      } else {
        setDisplayName(user?.email?.split('@')[0] || '');
      }
      setLoading(false);
    })();
  }, [isOpen]);

  const handleSave = async () => {
    setLoading(true);
    const auth = await getAuthHeader();
    const res = await fetch(`${API_BASE}/api/profile/me`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(auth ? { Authorization: auth } : {}) },
      body: JSON.stringify({ display_name: displayName, phone })
    });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json();
      alert(d?.error || 'Failed to save');
      return;
    }
    onClose();
  };

  return createPortal(
    (
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-50 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 flex items-center justify-center p-4" onClick={onClose}>
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
              >
                <div className="flex items-center justify-between p-5 border-b">
                  <h3 className="text-xl font-semibold text-slate-800">Your Profile</h3>
                  <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
                    <X size={18} />
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Display Name</label>
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Phone</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
                  </div>
                </div>
                <div className="p-5 border-t flex justify-end gap-2">
                  <button onClick={onClose} className="px-4 py-2 rounded-lg">Cancel</button>
                  <button onClick={handleSave} disabled={loading} className="px-4 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-60">
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ),
    document.body
  );
};

export default ProfileModal;


