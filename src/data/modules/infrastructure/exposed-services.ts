import { LKSModule } from '../../../types';

export const exposedServicesModule: LKSModule = {
  id: 'exposed-services',
  slug: 'exposed-services',
  title: 'Dangerous/Exposed Services',
  category: 'Infrastructure Hardening',
  description: 'Mendeteksi dan menutup layanan (services) berbahaya yang tidak seharusnya terekspos ke publik.',
  sections: [
    {
      id: 'concept',
      title: 'Prinsip Least Privilege dalam Jaringan',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Salah satu kesalahan terbesar dalam administrasi server adalah membiarkan layanan internal (seperti database, cache, atau panel admin) dapat diakses secara langsung dari internet publik.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Layanan seperti **Telnet (Port 23)**, **FTP (Port 21)**, **SMB (Port 445)**, atau bahkan **Redis (Port 6379)** dan **MySQL (Port 3306)** seharusnya HANYA dapat diakses dari dalam jaringan lokal (localhost atau VPC).'
        },
        {
          id: '3',
          type: 'alert',
          content: 'Jika hacker dapat melakukan pemindaian (scanning) menggunakan Nmap dan menemukan port database terbuka, mereka hanya perlu melakukan brute-force atau mengeksploitasi celah bawaan dari versi aplikasi tersebut.',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Lab Interaktif: Port Scanning & Firewalld',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Gunakan terminal emulator di bawah ini untuk melihat port mana yang terbuka menggunakan perintah `ss -tuln`. Kemudian, tutup port yang tidak aman (misalnya port 3306 MySQL yang ter-bind ke 0.0.0.0) dengan mengedit konfigurasinya atau menggunakan iptables. (Untuk lab ini, coba jalankan perintah pemindaian dasar).'
        },
        {
          id: '5',
          type: 'interactive',
          content: 'MockTerminal',
          metadata: {
            component: 'MockTerminal',
            title: 'Nmap Scanner Mock',
            expectedCommand: 'nmap 10.0.0.5',
            successOutput: `Starting Nmap 7.93 ( https://nmap.org )
Nmap scan report for 10.0.0.5
Host is up (0.00013s latency).
Not shown: 996 closed tcp ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
3306/tcp open  mysql
6379/tcp open  redis

VULNERABILITY DETECTED: Database and Cache services are exposed!`,
            hint: 'Coba jalankan: nmap 10.0.0.5',
            flag: 'INIT0{Cl0s3_Y0ur_P0rts_B0y}'
          }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_exposed_1',
    type: 'flag_submission',
    question: 'Berdasarkan hasil pemindaian di atas, submit flag yang didapat:',
    flag: 'INIT0{Cl0s3_Y0ur_P0rts_B0y}',
    explanation: 'Anda harus mengonfigurasi `bind-address = 127.0.0.1` pada MySQL dan mengaktifkan Firewall (UFW/iptables) untuk memblokir akses luar ke port tersebut.'
  }
};
