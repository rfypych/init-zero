import React, { useState } from 'react';
import { Settings, Lock, CheckCircle2, AlertTriangle, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const MockPAMConfig = () => {
  const [config, setConfig] = useState(
`# /etc/pam.d/common-password
password  requisite  pam_pwquality.so retry=3
password  success    pam_unix.so obscure use_authtok try_first_pass sha512`
  );
  const [testPassword, setTestPassword] = useState('Password123');
  const [result, setResult] = useState<{status: 'idle'|'success'|'error', msg: string}>({status: 'idle', msg: ''});

  const testConfig = () => {
    // Very basic frontend mock parser for pam_pwquality
    const lines = config.split('\n');
    const qualityLine = lines.find(l => l.includes('pam_pwquality.so'));

    if (!qualityLine) {
      setResult({status: 'error', msg: 'VULNERABLE: Modul pam_pwquality.so tidak ditemukan!'});
      return;
    }

    const minlenMatch = qualityLine.match(/minlen=(\d+)/);
    const dcreditMatch = qualityLine.match(/dcredit=([-]?\d+)/);
    const ucreditMatch = qualityLine.match(/ucredit=([-]?\d+)/);

    const minlen = minlenMatch ? parseInt(minlenMatch[1]) : 8;
    const reqDigit = dcreditMatch && parseInt(dcreditMatch[1]) < 0;
    const reqUpper = ucreditMatch && parseInt(ucreditMatch[1]) < 0;

    let errors = [];
    if (testPassword.length < minlen) errors.push(`Too short (min ${minlen})`);
    if (reqDigit && !/\d/.test(testPassword)) errors.push('Missing digit');
    if (reqUpper && !/[A-Z]/.test(testPassword)) errors.push('Missing uppercase');

    if (errors.length > 0) {
      setResult({status: 'error', msg: `REJECTED: ${errors.join(', ')}`});
    } else {
      if (minlen >= 12 && reqDigit && reqUpper) {
         setResult({status: 'success', msg: 'SECURE & ACCEPTED: Konfigurasi kuat. FLAG: INIT0{P4M_S3cur3d_B0y}'});
      } else {
         setResult({status: 'success', msg: 'ACCEPTED: (Warning: Konfigurasi masih lemah, coba tambahkan minlen=12, dcredit=-1, ucredit=-1)'});
      }
    }
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden my-6">
      <div className="bg-zinc-800/80 px-4 py-2 border-b border-zinc-700 flex items-center gap-2">
        <Settings className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-mono text-zinc-300">PAM Configuration Editor</span>
      </div>

      <div className="grid md:grid-cols-3 gap-0">
        <div className="md:col-span-2 p-0 border-b md:border-b-0 md:border-r border-zinc-800">
           <textarea
             value={config}
             onChange={(e) => setConfig(e.target.value)}
             className="w-full h-full min-h-[200px] bg-zinc-950 p-4 font-mono text-sm text-zinc-300 focus:outline-none resize-none"
             spellCheck="false"
           />
        </div>

        <div className="p-6 bg-zinc-950/50 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Test Password Entry</label>
            <input
              type="text"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>

          <button
            onClick={testConfig}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Apply & Test
          </button>

          {result.status !== 'idle' && (
             <motion.div
               initial={{opacity:0, scale:0.95}}
               animate={{opacity:1, scale:1}}
               className={`mt-2 p-3 border rounded text-xs ${
                 result.status === 'success' && result.msg.includes('FLAG') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                 result.status === 'success' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                 'bg-red-500/10 border-red-500/20 text-red-400'
               }`}
             >
               {result.msg}
             </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
