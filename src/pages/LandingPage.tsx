import React from 'react';
import { Shield, ArrowRight, Code2, Terminal, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="flex-1 max-w-4xl pt-20 pb-24 mx-auto flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
        <Shield className="w-4 h-4" />
        <span>LKS Cyber Security</span>
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
        Init[0] - Persiapan Kompetisi <br className="hidden md:block"/>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          Cyber Security
        </span>
      </h1>

      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
        Platform pembelajaran komprehensif yang dirancang khusus untuk membedah kisi-kisi teknis LKS tingkat Provinsi. Belajar dari nol dengan lab interaktif tanpa perlu setup server.
      </p>

      <Link
        to="/learn/sql-injection"
        className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-zinc-200 transition-transform hover:scale-105"
      >
        Mulai Belajar Sekarang <ArrowRight className="w-5 h-5" />
      </Link>

      <div className="grid md:grid-cols-3 gap-6 mt-24 w-full text-left">
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
            <Code2 className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Web Exploitation</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Pahami celah keamanan web seperti SQLi, XSS, dan Command Injection melalui simulasi form rentan langsung di browser.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
            <Terminal className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Infrastructure & SOC</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Pelajari cara mengeraskan server Linux (PAM Hardening) dan menganalisis log akses untuk mendeteksi anomali jaringan.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">CTF Ready</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Setiap modul dilengkapi tantangan bergaya Jeopardy (Flag Submission) untuk melatih insting problem solving Anda.
          </p>
        </div>
      </div>
    </div>
  );
};
