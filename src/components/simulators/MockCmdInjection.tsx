import React, { useState } from 'react';
import { Terminal, Globe, Send, ServerCrash, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const MockCmdInjection = () => {
  const [ip, setIp] = useState('8.8.8.8');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('http://localhost:3001/api/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip })
      });
      const data = await res.json();

      if (res.ok) {
        setOutput(data.output);
      } else {
        setOutput(`Error: ${data.error || 'Server returned an error'}`);
      }
    } catch (err: any) {
      setOutput('API Error: Backend server is not running on port 3001. Start it with `npm run backend`.');
    }
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6 shadow-xl">
      <div className="bg-zinc-800/80 px-5 py-3 border-b border-zinc-700 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Network Diagnostic Tool</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-1 rounded">POST /api/ping</span>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950/30">
          <p className="text-sm text-zinc-400 mb-6 font-medium leading-relaxed">Masukkan IP address untuk memverifikasi konektivitas ICMP dari server ke tujuan.</p>
          <form onSubmit={handlePing} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Target IP / Domain</label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-[15px] text-zinc-200 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] font-mono transition-all"
                placeholder="e.g. 8.8.8.8"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !ip.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg py-3 text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg shadow-indigo-500/20"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {loading ? 'Executing...' : 'Ping Target'}
            </button>
          </form>
        </div>

        <div className="p-6 bg-[#0a0a0c] flex flex-col">
          <div className="flex items-center justify-between mb-4 opacity-70">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Server Shell
            </span>
            <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-mono">Bash (Ubuntu)</span>
          </div>

          <div className="flex-1 bg-black border border-zinc-800 rounded-xl p-5 font-mono text-sm text-zinc-300 leading-loose overflow-x-auto custom-scrollbar shadow-inner relative group h-[200px]">
            {loading ? (
               <div className="flex items-center justify-center h-full">
                 <span className="animate-pulse text-zinc-500 flex items-center gap-2">
                   <ServerCrash className="w-5 h-5 animate-bounce" /> Executing command...
                 </span>
               </div>
            ) : output ? (
               <motion.div initial={{opacity:0}} animate={{opacity:1}} className="whitespace-pre-wrap">
                 <span className="text-green-500 font-bold">root@server:~#</span> ping -c 1 {ip}
                 {'\n' + output}
               </motion.div>
            ) : (
               <span className="text-zinc-600 italic">Console output will appear here...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
