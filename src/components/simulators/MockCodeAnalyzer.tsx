import React, { useState } from 'react';
import { Code2, Bug, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface MockCodeAnalyzerProps {
  title?: string;
  codeLines: string[];
  vulnerableLines: number[]; // index 0-based
  explanation: string;
  flag?: string;
}

export const MockCodeAnalyzer: React.FC<MockCodeAnalyzerProps> = ({
  title = "Source Code Analyzer",
  codeLines,
  vulnerableLines,
  explanation,
  flag
}) => {
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

  const toggleLine = (index: number) => {
    if (analyzed) return;
    setSelectedLines(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const isCorrect =
    selectedLines.length === vulnerableLines.length &&
    vulnerableLines.every(v => selectedLines.includes(v));

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6">
      <div className="bg-zinc-800/80 px-4 py-2 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-300">
          <Code2 className="w-4 h-4 text-rose-400" />
          <span className="text-sm font-mono">{title}</span>
        </div>
        {!analyzed && (
          <button
            onClick={() => setAnalyzed(true)}
            className="text-xs bg-rose-600 hover:bg-rose-500 text-white px-3 py-1 rounded transition-colors"
          >
            Submit Analysis
          </button>
        )}
      </div>

      <div className="p-4 bg-zinc-950 font-mono text-xs overflow-x-auto">
        <p className="text-zinc-500 mb-4 font-sans text-sm italic">
          Instruksi: Klik baris kode yang menurut Anda mengandung kerentanan (vulnerability).
        </p>

        {codeLines.map((line, i) => (
          <div
            key={i}
            onClick={() => toggleLine(i)}
            className={`cursor-pointer px-2 py-1 flex gap-4 border-l-2 transition-colors ${
              selectedLines.includes(i)
                ? 'bg-rose-500/20 border-rose-500 text-rose-100'
                : 'border-transparent text-zinc-400 hover:bg-zinc-900'
            } ${analyzed && selectedLines.includes(i) && !isCorrect ? 'border-red-500 bg-red-500/10' : ''}
              ${analyzed && vulnerableLines.includes(i) ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200' : ''}`}
          >
            <span className="text-zinc-600 select-none w-6 text-right">{i+1}</span>
            <span className="whitespace-pre">{line}</span>
          </div>
        ))}

        {analyzed && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="mt-6 p-4 border rounded bg-zinc-900 border-zinc-700">
            {isCorrect ? (
              <div>
                <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Analisis Tepat!
                </h4>
                <p className="font-sans text-zinc-300">
                  {explanation}
                  {flag && <><br/><br/><span className="text-emerald-400 font-mono text-sm bg-emerald-400/10 p-1 rounded">FLAG: {flag}</span></>}
                </p>
              </div>
            ) : (
              <div>
                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                  <Bug className="w-4 h-4" /> Analisis Kurang Tepat
                </h4>
                <p className="font-sans text-zinc-300">
                  Anda belum menemukan baris yang tepat atau memilih baris yang salah. Perhatikan fungsi yang menerima input dari user dan bagaimana input tersebut dieksekusi atau disimpan tanpa validasi.
                </p>
                <button onClick={() => {setAnalyzed(false); setSelectedLines([]);}} className="mt-4 text-rose-400 hover:text-rose-300 underline font-sans">Coba Lagi</button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
