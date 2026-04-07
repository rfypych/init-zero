# Init[0] - Cyber Security Learning Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <br>
  <img src="https://img.shields.io/badge/Status-Active-success.svg?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" />
</p>

## 🛡️ Tentang Proyek

**Init[0]** adalah platform pembelajaran interaktif berbasis web (E-Learning) yang dirancang secara khusus untuk persiapan **Lomba Kompetensi Siswa (LKS) Tingkat Nasional** pada bidang **Cyber Security**.

Platform ini dibangun menggunakan teknologi statis modern (React/Next.js ecosystem + Vite) untuk memberikan performa maksimal tanpa memerlukan konfigurasi backend atau Docker yang rumit. Semua simulasi eksploitasi dan analisis direkayasa (mocking) langsung di *frontend*.

## ✨ Fitur Utama

- 📚 **Silabus Lengkap LKS**: Struktur navigasi mencakup seluruh (~50) topik uji mulai dari *Infrastructure Hardening*, *Web Exploitation*, *Binary Exploitation*, hingga *Digital Forensics* dan *SOC*.
- 🎮 **Interactive Simulators**: Belajar teori sekaligus praktik langsung! Modul dilengkapi dengan *frontend mockup* untuk simulasi kerentanan:
  - MockSQLiForm (Authentication Bypass)
  - MockCmdInjection (Router Ping Tool)
  - MockDirTraversal (Local File Inclusion)
  - MockPAMConfig (Linux PAM Hardening Editor)
  - MockCipherSolver (Caesar Cipher Decoder)
  - MockLogAnalyzer (Brute Force Detection)
- 🏆 **Dynamic Assessment (CTF Style)**: Sistem kuis interaktif yang mendistribusikan flag (`INIT0{...}`) sebagai *reward* dari keberhasilan mengeksploitasi simulator.
- 🌑 **Modern Dark Mode UI**: Tampilan profesional ala dokumentasi modern (Tailwind + Slate/Zinc theme) dengan tipografi yang dioptimalkan untuk membaca.

## 🚀 Instalasi & Menjalankan Secara Lokal

Pastikan Anda memiliki [Node.js](https://nodejs.org/) terinstal di sistem Anda.

1. **Clone repositori ini:**
   ```
   git clone https://github.com/yourusername/init0.git
   cd init0
   ```

2. **Install dependensi:**
   ```
   npm install
   ```

3. **Jalankan development server:**
   ```
   npm run build && npm run preview
   ```
   Atau untuk development mode: `npm start` (tergantung konfigurasi script package.json Anda).

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) (dengan ekosistem React Router).
- **Build Tool**: [Vite](https://vitejs.dev/) (Cepat dan optimal).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first framework).
- **Animasi**: [Framer Motion](https://www.framer.com/motion/) (Animasi mikro interaktif).
- **Icons**: [Lucide React](https://lucide.dev/).
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/) (Strict typing untuk keandalan).

## 📝 Roadmap Konten

Saat ini, **6 Modul Prioritas** telah dikembangkan secara mendalam beserta simulatornya:
- [x] SQL Injection
- [x] Command Injection
- [x] Directory Traversal
- [x] Linux PAM Hardening
- [x] Classical Ciphers
- [x] Log Forensics
- [ ] *Sisa topik silabus akan ditambahkan secara bertahap.*

## 📄 Lisensi

Proyek ini menggunakan lisensi [MIT](LICENSE). Silakan gunakan dan modifikasi untuk keperluan belajar mengajar.
