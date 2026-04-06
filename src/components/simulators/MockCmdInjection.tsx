import React, { useState } from 'react';
import { Terminal, Globe, Send, ServerCrash } from 'lucide-react';
import { motion } from 'framer-motion';

export const MockCmdInjection = () => {
  const [ip, setIp] = useState('8.8.8.8');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handlePing = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');

    setTimeout(() => {
      let result = '';
      const basePing = `PING ${ip.split(';')[0].split('&')[0]} (8.8.8.8): 56 data bytes\n64 bytes from 8.8.8.8: icmp_seq=0 ttl=115 time=12.43 ms\n`;

      result += basePing;

      // Mock injection logic
      const lowerIp = ip.toLowerCase();
      if (lowerIp.includes('; ls') || lowerIp.includes('& ls') || lowerIp.includes('| ls')) {
        result += `\nindex.php\nadmin.php\nconfig.php\nflag.txt\n`;
      }
      else if (lowerIp.includes('cat flag.txt')) {
        result += `\nINIT0{cmd_1nj3ct10n_m4st3r}\n`;
      }
      else if (lowerIp.includes('whoami')) {
        result += `\nwww-data\n`;
      }
      else if (lowerIp.includes(';') || lowerIp.includes('&') || lowerIp.includes('|')) {
        result += `\nbash: command not found\n`;
      }

      setOutput(result);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6">
      <div className="bg-zinc-800/80 px-4 py-2 border-b border-zinc-700 flex items-center gap-2">
        <Globe className="w-4 h-4 text-indigo-400" />
        <span className="text-sm font-mono text-zinc-300">Network Diagnostic Tool</span>
      </div>

      <div className="p-6 border-b border-zinc-800">
        <p className="text-sm text-zinc-400 mb-4">Ping an IP address to check network connectivity.</p>
        <form onSubmit={handlePing} className="flex gap-3">
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="flex-1 bg-zinc-950 border border-zinc-700 rounded p-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 font-mono"
            placeholder="e.g. 8.8.8.8"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded px-6 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Pinging...' : 'Ping'}
          </button>
        </form>
      </div>

      <div className="p-6 bg-zinc-950/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Server Execution</span>
          </div>
          <span className="text-xs text-zinc-600 font-mono">system("ping -c 1 " + input)</span>
        </div>

        <div className="bg-black border border-zinc-800 rounded p-4 font-mono text-xs text-zinc-300 min-h-[120px] whitespace-pre-wrap">
          {loading ? (
             <span className="animate-pulse text-zinc-500">Executing...</span>
          ) : output ? (
             output.includes('INIT0') ? (
               <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                 <span className="text-green-400">{output}</span>
               </motion.div>
             ) : (
               <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                 {output}
               </motion.div>
             )
          ) : (
             <span className="text-zinc-600 italic">Output will appear here...</span>
          )}
        </div>
      </div>
    </div>
  );
};
