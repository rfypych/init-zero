import React, { useState } from 'react';
import { Search, AlertCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export const MockLogAnalyzer = () => {
  const logs = [
    `192.168.1.10 - - [10/Oct/2026:13:55:36 -0700] "GET / HTTP/1.1" 200 2326`,
    `192.168.1.10 - - [10/Oct/2026:13:55:40 -0700] "GET /login.php HTTP/1.1" 200 1204`,
    `192.168.1.15 - - [10/Oct/2026:13:56:01 -0700] "POST /login.php HTTP/1.1" 401 532`,
    `192.168.1.15 - - [10/Oct/2026:13:56:05 -0700] "POST /login.php HTTP/1.1" 401 532`,
    `192.168.1.15 - - [10/Oct/2026:13:56:09 -0700] "POST /login.php HTTP/1.1" 401 532`,
    `192.168.1.15 - - [10/Oct/2026:13:56:12 -0700] "POST /login.php HTTP/1.1" 401 532`,
    `192.168.1.15 - - [10/Oct/2026:13:56:15 -0700] "POST /login.php HTTP/1.1" 401 532`,
    `192.168.1.15 - - [10/Oct/2026:13:56:18 -0700] "POST /login.php HTTP/1.1" 200 3290`,
    `192.168.1.15 - - [10/Oct/2026:13:56:20 -0700] "GET /admin/dashboard.php HTTP/1.1" 200 5032`,
  ];

  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

  const toggleLine = (index: number) => {
    if (analyzed) return;
    setSelectedLines(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const analyze = () => {
    setAnalyzed(true);
  };

  const isCorrect = selectedLines.length === 5 && [2,3,4,5,6].every(v => selectedLines.includes(v));

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6">
      <div className="bg-zinc-800/80 px-4 py-2 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-mono text-zinc-300">access.log</span>
        </div>
        {!analyzed && (
          <button onClick={analyze} className="text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 py-1 rounded transition-colors">
            Analyze Selected
          </button>
        )}
      </div>

      <div className="p-4 bg-zinc-950 font-mono text-xs overflow-x-auto">
        <p className="text-zinc-500 mb-4 font-sans text-sm italic">
          Instruksi: Pilih (klik) baris log yang menunjukkan indikasi serangan "Brute Force" sebelum akhirnya berhasil login.
        </p>

        {logs.map((log, i) => (
          <div
            key={i}
            onClick={() => toggleLine(i)}
            className={`cursor-pointer px-2 py-1 flex gap-4 border-l-2 transition-colors ${
              selectedLines.includes(i)
                ? 'bg-sky-500/20 border-sky-500 text-sky-100'
                : 'border-transparent text-zinc-400 hover:bg-zinc-900'
            } ${analyzed && selectedLines.includes(i) && !isCorrect ? 'border-red-500 bg-red-500/10' : ''}
              ${analyzed && [2,3,4,5,6].includes(i) ? 'border-emerald-500 bg-emerald-500/10' : ''}`}
          >
            <span className="text-zinc-600 select-none">{i+1}</span>
            <span className="whitespace-nowrap">{log}</span>
          </div>
        ))}

        {analyzed && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="mt-6 p-4 border rounded bg-zinc-900 border-zinc-700">
            {isCorrect ? (
              <div>
                <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Analisis Tepat!
                </h4>
                <p className="font-sans text-zinc-300">
                  Anda berhasil mengidentifikasi pola 5 kali gagal login (HTTP 401) secara berurutan dalam waktu singkat dari IP yang sama, diikuti dengan login sukses (HTTP 200). Ini adalah ciri khas Brute Force attack.
                  <br/><br/>
                  <span className="text-emerald-400 font-mono text-sm bg-emerald-400/10 p-1 rounded">FLAG: INIT0{"{" + "L0g_Hunt3r_M4st3r" + "}"}</span>
                </p>
              </div>
            ) : (
              <div>
                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Analisis Kurang Tepat
                </h4>
                <p className="font-sans text-zinc-300">
                  Perhatikan status HTTP code `401` (Unauthorized) yang terjadi berulang-ulang dalam hitungan detik. Cobalah identifikasi baris-baris tersebut.
                </p>
                <button onClick={() => {setAnalyzed(false); setSelectedLines([]);}} className="mt-4 text-sky-400 hover:text-sky-300 underline font-sans">Coba Lagi</button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
