import React, { useState } from 'react';
import { KeyRound, ArrowRight, Binary } from 'lucide-react';
import { motion } from 'framer-motion';

export const MockCipherSolver = () => {
  const [input, setInput] = useState('LQLW0{Fdhvdu_Flskhu_Lvdzhvrph}');
  const [shift, setShift] = useState(3);

  const decryptCaesar = (text: string, s: number) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= 'Z' ? 65 : 97;
      // Reverse shift for decryption
      return String.fromCharCode(((char.charCodeAt(0) - base - s + 26) % 26) + base);
    });
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6">
      <div className="bg-zinc-800/80 px-4 py-2 border-b border-zinc-700 flex items-center gap-2">
        <Binary className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-mono text-zinc-300">Caesar Cipher Decoder</span>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Ciphertext</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-sm text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
              rows={2}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-xs font-medium text-zinc-400 whitespace-nowrap">Shift (ROT):</label>
            <input
              type="range"
              min="0"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value))}
              className="flex-1 accent-orange-500"
            />
            <span className="font-mono text-orange-400 font-bold w-6 text-center">{shift}</span>
          </div>

          <div className="flex items-center justify-center py-2 text-zinc-600">
            <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Plaintext (Decrypted)</label>
            <div className={`w-full border rounded p-3 text-sm font-mono break-all ${
              decryptCaesar(input, shift).includes('INIT0')
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold'
                : 'bg-zinc-950 border-zinc-700 text-zinc-400'
            }`}>
              {decryptCaesar(input, shift)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
