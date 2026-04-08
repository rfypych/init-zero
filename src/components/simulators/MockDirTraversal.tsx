import React, { useState } from 'react';
import { Folder, File, FileText, AlertTriangle, RefreshCw, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export const MockDirTraversal = () => {
  const [path, setPath] = useState('images/logo.png');
  const [content, setContent] = useState<string>('');
  const [isImage, setIsImage] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchFile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setContent('');

    if (path === 'images/logo.png') {
      setIsImage(true);
      setContent('âââ LOGO.PNG âââ');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/read?file=${encodeURIComponent(path)}`);
      const text = await res.text();
      setIsImage(false);
      setContent(text);
    } catch (err: any) {
      setIsImage(false);
      setContent('API Error: Backend server is not running on port 3001.');
    }
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6 shadow-xl">
      <div className="bg-zinc-800/80 px-5 py-3 border-b border-zinc-700 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-bold text-zinc-300 uppercase tracking-widest">File Viewer App</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-1 rounded">GET /api/read</span>
      </div>

      <div className="p-6 border-b border-zinc-800 bg-zinc-950/30">
        <form onSubmit={fetchFile} className="flex flex-col sm:flex-row gap-4 relative">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-zinc-500 font-mono text-sm font-bold tracking-wider">?file=</span>
            </div>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full bg-zinc-950/80 border-2 border-zinc-700 pl-16 pr-4 py-4 rounded-xl font-mono text-[15px] text-zinc-200 focus:outline-none focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(234,179,8,0.15)] transition-all shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !path.trim()}
            className="bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-zinc-950 font-bold rounded-xl px-8 py-4 sm:py-0 text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 whitespace-nowrap"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
            {loading ? 'Reading...' : 'Load File'}
          </button>
        </form>
        <div className="mt-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
          <Terminal className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Live Backend Code (fs.readFile):</h4>
            <p className="text-xs text-zinc-400 font-mono">
              const requestedPath = path.join(__dirname, 'public', req.query.file);
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#0a0a0c] min-h-[250px] flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        {loading ? (
           <RefreshCw className="w-10 h-10 animate-spin text-zinc-600" />
        ) : content === '' ? (
           <span className="text-zinc-600 uppercase font-bold tracking-widest text-sm">NO FILE LOADED</span>
        ) : isImage ? (
           <div className="flex flex-col items-center text-zinc-500 relative z-10">
             <File className="w-20 h-20 mb-4 opacity-50" />
             <span className="font-mono text-sm tracking-widest">{content}</span>
           </div>
        ) : content.includes('root:x') || content.includes('INIT0{') ? (
           <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="w-full h-full bg-black border border-zinc-800 rounded-xl p-5 overflow-auto font-mono text-sm text-green-400 whitespace-pre shadow-2xl relative z-10 leading-loose">
             {content}
           </motion.div>
        ) : (
           <div className="text-red-400 flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-5 rounded-xl shadow-inner relative z-10 font-mono text-sm max-w-full overflow-x-auto">
             <AlertTriangle className="w-6 h-6 flex-shrink-0" />
             {content}
           </div>
        )}
      </div>
    </div>
  );
};
