import React, { useState } from 'react';
import { Terminal, ShieldAlert, CheckCircle2, Play, Lock, Unlock } from 'lucide-react';
import { motion } from 'motion/react';

export default function CommandInjectionSandbox({ onComplete }: { onComplete?: () => void }) {
  const [ipAddress, setIpAddress] = useState('127.0.0.1');
  const [output, setOutput] = useState<string[]>(['System ready. Enter IP to ping.']);
  const [flag, setFlag] = useState('');
  const [isSolved, setIsSolved] = useState(false);

  // Simulasi Backend Logic untuk Command Injection
  const handlePing = (e: React.FormEvent) => {
    e.preventDefault();
    let newOutput = [...output, `> ping -c 3 ${ipAddress}`];

    // Cek apakah ada karakter injeksi (;, &&, ||)
    if (ipAddress.includes(';') || ipAddress.includes('&&') || ipAddress.includes('||')) {
      newOutput.push('PING 127.0.0.1 (127.0.0.1): 56 data bytes');
      newOutput.push('64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms');
      
      // Simulasi eksekusi command setelah injeksi
      if (ipAddress.includes('cat flag.txt') || ipAddress.includes('cat flag')) {
        newOutput.push('INIT0{cmd_1nj3ct10n_byp4ss_m4st3r}');
      } else if (ipAddress.includes('ls')) {
        newOutput.push('index.php');
        newOutput.push('ping.sh');
        newOutput.push('flag.txt');
      } else if (ipAddress.includes('whoami')) {
        newOutput.push('www-data');
      } else if (ipAddress.includes('pwd')) {
        newOutput.push('/var/www/html');
      } else {
        newOutput.push('sh: command not found or output hidden');
      }
    } else {
      // Normal ping
      newOutput.push(`PING ${ipAddress} (${ipAddress}): 56 data bytes`);
      newOutput.push(`64 bytes from ${ipAddress}: icmp_seq=0 ttl=64 time=0.045 ms`);
      newOutput.push(`64 bytes from ${ipAddress}: icmp_seq=1 ttl=64 time=0.038 ms`);
      newOutput.push(`64 bytes from ${ipAddress}: icmp_seq=2 ttl=64 time=0.041 ms`);
    }

    setOutput(newOutput);
  };

  const handleFlagSubmit = () => {
    if (flag === 'INIT0{cmd_1nj3ct10n_byp4ss_m4st3r}') {
      setIsSolved(true);
      if (onComplete) onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col xl:flex-row gap-6 h-full"
    >
      {/* KIRI: Materi & Konteks */}
      <div className="w-full xl:w-1/3 flex flex-col gap-6">
        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-6 shadow-lg flex-1">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="text-[#3B82F6] w-6 h-6" />
            <h1 className="text-[#FAFAFA] text-xl font-semibold tracking-tight">Command Injection</h1>
          </div>
          
          <div className="prose prose-invert prose-sm max-w-none text-[#A1A1AA]">
            <p className="mb-4">
              Aplikasi di sebelah kanan dirancang untuk melakukan <code className="font-mono text-[#3B82F6] bg-[#3B82F6]/10 px-1.5 py-0.5 rounded">ping</code> ke sebuah IP address untuk mengecek konektivitas jaringan.
            </p>
            <p className="mb-4">
              Namun, developer menggunakan fungsi sistem operasi secara langsung tanpa melakukan sanitasi input dengan benar. Di backend, kode yang berjalan kira-kira seperti ini:
            </p>
            <pre className="bg-[#121212] border border-[#2a2a2a] p-3 rounded-lg text-xs font-mono text-[#FAFAFA] mb-4 overflow-x-auto">
              {`// PHP Backend Example
$target = $_POST['ip'];
system("ping -c 3 " . $target);`}
            </pre>
            <p className="mb-6">
              <strong>Misi Anda:</strong> Manfaatkan kerentanan ini untuk membaca isi dari file <code className="font-mono text-[#FAFAFA]">flag.txt</code>. Gunakan operator shell seperti <code className="font-mono text-[#FAFAFA]">;</code> atau <code className="font-mono text-[#FAFAFA]">&amp;&amp;</code> untuk menyisipkan perintah tambahan.
            </p>
          </div>

          {/* CTF Flag Input */}
          <div className="pt-6 border-t border-[#2a2a2a] mt-auto">
            <label className="block text-xs font-medium text-[#FAFAFA] mb-2 uppercase tracking-wider">Submit Flag</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="INIT0{...}"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                disabled={isSolved}
                className="flex-1 bg-[#121212] border border-[#2a2a2a] text-[#FAFAFA] font-mono text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#3B82F6] transition-colors disabled:opacity-50"
              />
              <button 
                onClick={handleFlagSubmit}
                disabled={isSolved || !flag}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                  isSolved 
                  ? 'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/50' 
                  : flag
                    ? 'bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:bg-[#2563eb]'
                    : 'bg-[#2a2a2a] text-[#A1A1AA] cursor-not-allowed'
                }`}
              >
                {isSolved ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                {isSolved ? 'Solved' : 'Submit'}
              </button>
            </div>
            {isSolved && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-[#22c55e] text-xs mt-3 flex items-center gap-1.5 font-medium"
              >
                <CheckCircle2 className="w-4 h-4" /> Flag Valid! Modul berikutnya telah terbuka.
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* KANAN: Interactive Sandbox (Mock Browser/Terminal) */}
      <div className="w-full xl:w-2/3 flex flex-col bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-lg min-h-[500px]">
        
        {/* Mock Browser Header */}
        <div className="bg-[#151515] border-b border-[#2a2a2a] px-4 py-3 flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/50"></div>
            <div className="w-3 h-3 rounded-full bg-[#eab308]/20 border border-[#eab308]/50"></div>
            <div className="w-3 h-3 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/50"></div>
          </div>
          <div className="flex-1 bg-[#121212] border border-[#2a2a2a] rounded-md px-3 py-1.5 flex items-center gap-2">
            <Lock className="w-3 h-3 text-[#A1A1AA]" />
            <span className="text-xs text-[#A1A1AA] font-mono">https://init0-sandbox.local/ping-tool</span>
          </div>
        </div>

        {/* Sandbox Content */}
        <div className="p-6 flex-1 flex flex-col gap-6">
          
          {/* Vulnerable Form */}
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-lg p-5">
            <h2 className="text-[#FAFAFA] font-medium mb-1">Network Diagnostic Tool</h2>
            <p className="text-xs text-[#A1A1AA] mb-4">Enter an IP address to check connectivity.</p>
            
            <form onSubmit={handlePing} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="flex-1 bg-[#1c1c1c] border border-[#2a2a2a] text-[#FAFAFA] font-mono text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
              <button 
                type="submit"
                className="bg-[#FAFAFA] text-[#121212] hover:bg-[#e5e5e5] px-5 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4 fill-current" /> Run Ping
              </button>
            </form>
          </div>

          {/* Terminal Output */}
          <div className="flex-1 bg-[#121212] border border-[#2a2a2a] rounded-lg p-4 font-mono text-sm overflow-y-auto relative min-h-[250px]">
            <div className="sticky top-0 left-0 w-full pb-2 mb-2 border-b border-[#2a2a2a] bg-[#121212]/90 backdrop-blur flex items-center gap-2 z-10">
              <Terminal className="w-4 h-4 text-[#A1A1AA]" />
              <span className="text-xs uppercase tracking-wider text-[#A1A1AA]">Output Console</span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              {output.map((line, idx) => (
                <div key={idx} className={`break-all ${line.includes('INIT0{') ? 'text-[#3B82F6] font-bold' : 'text-[#A1A1AA]'}`}>
                  {line}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
