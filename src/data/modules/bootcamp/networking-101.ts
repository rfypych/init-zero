import { CyberSecModule } from '../../../types';

export const networking101Module: CyberSecModule = {
  id: 'networking-101',
  slug: 'networking-101',
  title: 'Networking 101',
  category: 'Bootcamp 101',
  description: 'Apa itu IP, Port, dan DNS? Bagaimana sebuah komputer terhubung dan berkomunikasi satu sama lain?',
  sections: [
    {
      id: 'objective',
      title: 'Mission Objective',
      blocks: [
        {
          id: '1',
          type: 'alert',
          content: 'Goal: Memahami peta jaringan dan "rumah" dari suatu aplikasi di internet, agar Anda tahu pintu mana yang harus diketuk saat melakukan Penetrasi (PenTest).',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'concept',
      title: 'Alamat Rumah Komputer (IP)',
      blocks: [
        {
          id: '2',
          type: 'text',
          content: 'Setiap perangkat di internet (atau jaringan WiFi rumah Anda) membutuhkan alamat agar bisa saling mengirim pesan, persis seperti nomor rumah. Format paling populer saat ini adalah IPv4 (contoh: `192.168.1.5` atau `8.8.8.8`).'
        },
        {
          id: '3',
          type: 'text',
          content: 'Namun, manusia kesulitan menghapal deretan angka. Maka dibuatlah "Buku Telepon" bernama DNS (Domain Name System). Saat Anda mengetik `google.com`, DNS akan mencarikan nomor IP-nya: `142.250.191.46`.'
        }
      ]
    },
    {
      id: 'ports',
      title: 'Pintu Rumah (Port)',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Jika IP adalah **Nomor Rumah**, maka Port adalah **Pintu Masuk** ke rumah tersebut. Sebuah komputer server (seperti hotel besar) bisa melayani banyak tamu berbeda melalui puluhan ribu pintu (total ada 65,535 port).'
        },
        {
          id: '5',
          type: 'alert',
          content: 'Port yang umum digunakan:\n- Port 80 (HTTP): Halaman web biasa yang tidak aman.\n- Port 443 (HTTPS): Halaman web aman (menggunakan gembok hijau).\n- Port 22 (SSH): Pintu rahasia admin untuk mengontrol server dari jarak jauh (Terminal Remote).\n- Port 3306 (MySQL): Pintu menuju brankas data utama (Database).',
          metadata: { type: 'info' }
        }
      ]
    },
    {
      id: 'tooling',
      title: 'Real-World CTF Approach (Nmap Scanning)',
      blocks: [
        {
          id: '6',
          type: 'text',
          content: 'Jika IP adalah rumah, dan Port adalah pintu... Hacker tentu tidak akan mengetuk semua 65.535 pintu secara manual. Mereka menggunakan alat pemindai otomatis.'
        },
        {
          id: '7',
          type: 'code',
          content: `# Nmap (Network Mapper) adalah radar andalan hacker.\nnmap -sC -sV 10.10.10.20\n\n# -sC: Jalankan script deteksi kerentanan otomatis.\n# -sV: Tanyakan versi persis aplikasi di balik pintu itu (misal: Apache 2.4.49).`,
          metadata: { language: 'bash' }
        },
        {
          id: '8',
          type: 'text',
          content: 'Jika Anda menemukan versi `Apache 2.4.49` terbuka di Port 80, Anda cukup mencari di Google: "Apache 2.4.49 Exploit" untuk mendapatkan senjata RCE siap pakai (CVE-2021-41773)!'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_boot_3',
    type: 'mcq',
    question: 'Anda adalah seorang analis keamanan yang sedang memeriksa server database. Pintu (Port) nomor berapakah yang paling sering menjadi target serangan jika tidak diamankan dengan benar?',
    options: [
      { id: '1', text: 'Port 80', isCorrect: false },
      { id: '2', text: 'Port 443', isCorrect: false },
      { id: '3', text: 'Port 22', isCorrect: false },
      { id: '4', text: 'Port 3306', isCorrect: true }
    ],
    hints: [
      "Setiap aplikasi berjalan di port yang spesifik agar tidak bertabrakan.",
      "Database sangat populer menyimpan username/password dan rahasia perusahaan.",
      "Port ini dikaitkan dengan MySQL (Sistem Manajemen Database Populer)."
    ],
    explanation: 'Port 3306 adalah port default untuk koneksi MySQL Database.'
  }
};
