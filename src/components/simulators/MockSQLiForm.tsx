import React, { useState } from 'react';
import { Terminal, Database, KeyRound, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const MockSQLiForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<'idle' | 'success' | 'error' | 'syntax_error'>('idle');
  const [query, setQuery] = useState("SELECT * FROM users WHERE username='[INPUT]' AND password='[INPUT]'");

  const handleInput = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setQuery(`SELECT * FROM users WHERE username='${u}' AND password='${p}'`);
    setResult('idle');
  };

  const attemptLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Very simple frontend mock of SQLi
    const isPayload = (str: string) => {
      const s = str.toLowerCase();
      return s.includes("' or '1'='1") ||
             s.includes("' or 1=1") ||
             s.includes('" or "1"="1') ||
             s.includes("' or 'a'='a") ||
             s.includes("'--");
    };

    const isSyntaxError = (str: string) => {
      // Unclosed quote without valid OR payload
      return (str.split("'").length % 2 === 0) && !isPayload(str);
    };

    if (isPayload(username) || isPayload(password)) {
      setResult('success');
    } else if (isSyntaxError(username) || isSyntaxError(password)) {
      setResult('syntax_error');
    } else {
      setResult('error');
    }
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6">
      <div className="bg-zinc-800/80 px-4 py-2 border-b border-zinc-700 flex items-center gap-2">
        <Database className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-mono text-zinc-300">Target: Internal Admin Panel</span>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-zinc-800">
          <form onSubmit={attemptLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => handleInput(e.target.value, password)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm text-zinc-200 focus:outline-none focus:border-blue-500 font-mono"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => handleInput(username, e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-sm text-zinc-200 focus:outline-none focus:border-blue-500 font-mono"
                placeholder="â¢â¢â¢â¢â¢â¢â¢"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              Login
            </button>
          </form>

          {result === 'error' && (
             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm flex gap-2">
               <AlertTriangle className="w-5 h-5 flex-shrink-0" />
               Invalid credentials. Access Denied.
             </motion.div>
          )}
          {result === 'syntax_error' && (
             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-400 text-sm flex gap-2">
               <AlertTriangle className="w-5 h-5 flex-shrink-0" />
               SQL Syntax Error near line 1.
             </motion.div>
          )}
          {result === 'success' && (
             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 text-sm flex gap-2 flex-col">
               <div className="flex gap-2">
                 <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                 <span>Authentication Bypass Successful!</span>
               </div>
               <div className="font-mono bg-emerald-500/20 p-2 rounded mt-2 text-xs break-all">
                 FLAG: INIT0{"{" + "SQLi_1s_n0t_d3ad" + "}"}
               </div>
             </motion.div>
          )}
        </div>

        <div className="p-6 bg-zinc-950/50">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Backend Query Executed</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded p-4 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
            <span className="text-blue-400">SELECT</span> * <span className="text-blue-400">FROM</span> users <span className="text-blue-400">WHERE</span><br/>
            &nbsp;&nbsp;username='<span className={result === 'success' ? 'text-red-400 font-bold' : 'text-green-400'}>{username}</span>'<br/>
            &nbsp;&nbsp;<span className="text-blue-400">AND</span> password='<span className={result === 'success' ? 'text-red-400 font-bold' : 'text-green-400'}>{password}</span>'
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Perhatikan bagaimana input Anda langsung masuk ke dalam string query tanpa sanitasi. Coba masukkan <code className="bg-zinc-800 px-1 rounded text-zinc-300">' OR '1'='1</code> di kolom username.
          </p>
        </div>
      </div>
    </div>
  );
};
