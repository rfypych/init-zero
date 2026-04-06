import React from 'react';
import { motion } from 'motion/react';
import { Shield, Server, Search, Key, Globe, Cpu, TerminalSquare } from 'lucide-react';

const levels = [
  {
    id: 1,
    title: "Fondasi Pertahanan & Operasi",
    subtitle: "Infrastructure Hardening & SOC",
    icon: <Server className="w-6 h-6" />,
    modules: ["Pengerasan Infrastruktur Linux", "Pusat Operasi Keamanan (SOC)"],
    progress: 100,
    status: "completed"
  },
  {
    id: 2,
    title: "Investigasi & Analisis Jejak",
    subtitle: "Digital Forensic",
    icon: <Search className="w-6 h-6" />,
    modules: ["Ekskavasi Data Tersembunyi", "Forensik Jaringan & OS", "Analisis Tingkat Lanjut"],
    progress: 100,
    status: "completed"
  },
  {
    id: 3,
    title: "Seni Menyembunyikan Pesan",
    subtitle: "Cryptography",
    icon: <Key className="w-6 h-6" />,
    modules: ["Kriptografi Dasar & Hashing", "Serangan Asimetris & Acak", "Kriptografi Modern"],
    progress: 100,
    status: "completed"
  },
  {
    id: 4,
    title: "Eksploitasi Aplikasi Web",
    subtitle: "Web Exploitation",
    icon: <Globe className="w-6 h-6" />,
    modules: [
      "Injeksi & Manipulasi Dasar",
      "Manipulasi Autentikasi & Sesi",
      "Eksploitasi Logika & Lanjutan",
      "Kerentanan Modern & API",
      "Eksploitasi Arsitektur"
    ],
    progress: 20,
    status: "active"
  },
  {
    id: 5,
    title: "Pembedahan Kode & Arsitektur",
    subtitle: "Reverse Engineering",
    icon: <Cpu className="w-6 h-6" />,
    modules: ["Arsitektur & Format Tingkat Rendah", "Analisis Statis & Dinamis", "Framework & Sintaks", "Teknik Anti-Analisis"],
    progress: 0,
    status: "locked"
  },
  {
    id: 6,
    title: "Eksploitasi Tingkat Rendah",
    subtitle: "Binary Exploitation",
    icon: <TerminalSquare className="w-6 h-6" />,
    modules: ["Kerentanan Memori Dasar", "Manipulasi Eksekusi", "Bypass Proteksi & ROP"],
    progress: 0,
    status: "locked"
  }
];

export default function Dashboard({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto pb-12"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#FAFAFA] mb-2 tracking-tight">Visual Roadmap Masterplan</h1>
        <p className="text-[#A1A1AA]">Jalur pembelajaran komprehensif dari dasar jaringan hingga eksploitasi binary tingkat lanjut.</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-[#2a2a2a] hidden md:block"></div>

        <div className="flex flex-col gap-8">
          {levels.map((level, index) => (
            <motion.div 
              key={level.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col md:flex-row gap-6"
            >
              {/* Icon / Node */}
              <div className="hidden md:flex flex-col items-center z-10">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-[#121212] ${
                  level.status === 'completed' ? 'bg-[#3B82F6] text-white' :
                  level.status === 'active' ? 'bg-[#1c1c1c] border-[#3B82F6] text-[#3B82F6]' :
                  'bg-[#1c1c1c] border-[#2a2a2a] text-[#555555]'
                }`}>
                  {level.icon}
                </div>
              </div>

              {/* Content Card */}
              <div className={`flex-1 bg-[#1c1c1c] border rounded-xl p-6 transition-all ${
                level.status === 'active' ? 'border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-[#2a2a2a]'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6]">Level {level.id}</span>
                      <span className="text-xs text-[#A1A1AA] px-2 py-0.5 bg-[#2a2a2a] rounded-full">{level.subtitle}</span>
                    </div>
                    <h2 className={`text-xl font-semibold ${level.status === 'locked' ? 'text-[#A1A1AA]' : 'text-[#FAFAFA]'}`}>
                      {level.title}
                    </h2>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full sm:w-32">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#A1A1AA]">Progress</span>
                      <span className={level.status === 'completed' ? 'text-[#3B82F6]' : 'text-[#FAFAFA]'}>{level.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#3B82F6] rounded-full transition-all duration-1000"
                        style={{ width: `${level.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {level.modules.map((mod, i) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        if (mod === "Injeksi & Manipulasi Dasar") {
                          onNavigate('sandbox');
                        }
                      }}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        level.status === 'locked' 
                          ? 'border-transparent bg-[#151515] text-[#555555]' 
                          : mod === "Injeksi & Manipulasi Dasar"
                            ? 'border-[#3B82F6]/50 bg-[#3B82F6]/10 text-[#FAFAFA] cursor-pointer hover:bg-[#3B82F6]/20 transition-colors'
                            : 'border-[#2a2a2a] bg-[#151515] text-[#A1A1AA]'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        level.status === 'completed' ? 'bg-[#3B82F6]' :
                        mod === "Injeksi & Manipulasi Dasar" ? 'bg-[#3B82F6] animate-pulse' :
                        'bg-[#333333]'
                      }`}></div>
                      <span className="text-sm font-medium">{mod}</span>
                      {mod === "Injeksi & Manipulasi Dasar" && (
                        <span className="ml-auto text-xs bg-[#3B82F6] text-white px-2 py-0.5 rounded-full">Active</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
