'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, Mail, Loader2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email);
    } catch (err) {
      setError('Invalid email address. Try admin@example.com, user1@example.com, or user2@example.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 pb-0 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-6">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Tenant OS</h1>
            <p className="text-slate-500 mt-2">Enter your email to access your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              {error && <p className="text-xs font-medium text-red-500 mt-1 ml-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>

            <div className="pt-4 border-t border-slate-50">
              <p className="text-[10px] text-center uppercase tracking-widest font-bold text-slate-300">
                Demo Credentials
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['admin@example.com', 'user1@example.com', 'user2@example.com'].map(e => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmail(e)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-[10px] font-bold transition-colors"
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
