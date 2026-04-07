import React, { useState } from 'react';
import { Folder, File, FileText, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const MockDirTraversal = () => {
  const [path, setPath] = useState('images/logo.png');
  const [content, setContent] = useState<string>('');
  const [isImage, setIsImage] = useState(true);

  const fetchFile = (e: React.FormEvent) => {
    e.preventDefault();

    // Normalize path to count how many times they went up
    const depth = (path.match(/\.\.\//g) || []).length;

    if (path === 'images/logo.png') {
      setIsImage(true);
      setContent('âââ LOGO.PNG âââ');
    } else if (depth >= 3 && path.includes('etc/passwd')) {
      setIsImage(false);
      setContent(`root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
ctf:x:1000:1000:CTF_Player,,,:/home/CTF:/bin/bash
INIT0{P4th_Tr4v3rs4l_M4st3r}`);
    } else {
      setIsImage(false);
      setContent('Error: File not found or access denied.');
    }
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6">
      <div className="bg-zinc-800/80 px-4 py-2 border-b border-zinc-700 flex items-center gap-2">
        <Folder className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-mono text-zinc-300">File Viewer Application</span>
      </div>

      <div className="p-6 border-b border-zinc-800 bg-zinc-950">
        <form onSubmit={fetchFile} className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center flex-1 bg-zinc-900 border border-zinc-700 rounded px-3 py-2">
            <span className="text-zinc-500 font-mono mr-2">?file=</span>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-zinc-200 font-mono"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 text-zinc-900 font-bold rounded px-6 py-2 text-sm transition-colors"
          >
            Load File
          </button>
        </form>
        <p className="mt-2 text-xs text-zinc-500">
          Hint: Aplikasi berjalan di <code className="text-zinc-400">/var/www/html/</code>. Coba akses <code className="text-zinc-400">/etc/passwd</code>.
        </p>
      </div>

      <div className="p-6 bg-zinc-900 min-h-[200px] flex items-center justify-center">
        {content === '' ? (
           <span className="text-zinc-600">No file loaded</span>
        ) : isImage ? (
           <div className="flex flex-col items-center text-zinc-500">
             <File className="w-16 h-16 mb-2" />
             <span>[Image Rendered: {content}]</span>
           </div>
        ) : content.includes('root:x') ? (
           <motion.div initial={{opacity:0}} animate={{opacity:1}} className="w-full h-full bg-black border border-zinc-800 rounded p-4 overflow-auto font-mono text-xs text-green-400 whitespace-pre">
             {content}
           </motion.div>
        ) : (
           <div className="text-red-400 flex items-center gap-2">
             <AlertTriangle className="w-5 h-5" />
             {content}
           </div>
        )}
      </div>
    </div>
  );
};
