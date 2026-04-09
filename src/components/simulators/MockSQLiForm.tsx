import React, { useState } from 'react';
import { Database, KeyRound, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const MockSQLiForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const attemptLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('idle');

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok) {
        setResult('success');
        setResponseMsg(`Welcome, ${data.user.username}! ${data.flag ? '\\nFLAG: ' + data.flag : ''}`);
      } else {
        setResult('error');
        setResponseMsg(`Login failed: ${data.error}`);
      }
    } catch (err: any) {
      setResult('error');
      setResponseMsg('API Error: Backend server is not running on port 3001. Start it with `npm run backend`.');
    }
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6 shadow-xl">
      <div className="bg-zinc-800/80 px-5 py-3 border-b border-zinc-700 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Internal Admin Panel</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-1 rounded">POST /api/login</span>
      </div>

      <div className="grid md:grid-cols-5 gap-0">
        <div className="md:col-span-2 p-6 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950/30">
          <form onSubmit={attemptLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-[15px] text-zinc-200 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] font-mono transition-all"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-[15px] text-zinc-200 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] font-mono transition-all"
                placeholder="â¢â¢â¢â¢â¢â¢â¢"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg py-3 text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <KeyRound className="w-5 h-5" />}
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          {result === 'error' && (
             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="mt-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3 shadow-inner">
               <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
               <span className="font-mono whitespace-pre-wrap">{responseMsg}</span>
             </motion.div>
          )}
          {result === 'success' && (
             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="mt-5 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-start gap-3 shadow-inner">
               <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
               <span className="font-mono whitespace-pre-wrap font-bold">{responseMsg}</span>
             </motion.div>
          )}
        </div>

        <div className="md:col-span-3 p-6 bg-[#0a0a0c] flex flex-col">
          <div className="flex items-center justify-between mb-4 opacity-70">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Database className="w-4 h-4" /> Live Backend Query
            </span>
            <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-mono">SQLite3 Engine</span>
          </div>

          <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-5 font-mono text-sm text-zinc-300 leading-loose overflow-x-auto custom-scrollbar shadow-inner relative group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-blue-400 font-bold">SELECT</span> * <span className="text-blue-400 font-bold">FROM</span> users <span className="text-purple-400 font-bold">WHERE</span><br/>
            &nbsp;&nbsp;username = '<span className={result === 'success' ? 'text-emerald-400 font-bold' : 'text-zinc-100'}>{username}</span>'<br/>
            &nbsp;&nbsp;<span className="text-purple-400 font-bold">AND</span> password = '<span className={result === 'success' ? 'text-emerald-400 font-bold' : 'text-zinc-100'}>{password}</span>'
          </div>

          <div className="mt-5 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Real-World CTF Approach:</h4>
            <p className="text-sm text-zinc-400 leading-relaxed font-mono">
              $ sqlmap -u "http://localhost:3001/api/login" --data="username=a&password=a" --dbs
            </p>
            <p className="text-xs text-zinc-500 mt-2 italic">Aplikasi ini sekarang mengirim permintaan HTTP POST asli ke backend Node.js + SQLite. Coba jalankan sqlmap ke URL tersebut.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
