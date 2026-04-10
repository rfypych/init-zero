import { CyberSecModule } from '../../../types';

export const linux101Module: CyberSecModule = {
  id: 'linux-101',
  slug: 'linux-101',
  title: 'Linux Basics 101',
  category: 'Bootcamp 101',
  description: 'Pengantar wajib bagi pemula. Mengenal antarmuka Command Line Interface (CLI) dan perintah dasar Linux yang menjadi senjata utama seorang Hacker.',
  sections: [
    {
      id: 'objective',
      title: 'Mission Objective',
      blocks: [
        {
          id: '1',
          type: 'alert',
          content: 'Goal: Membiasakan diri menggunakan terminal tanpa mouse, menelusuri direktori, dan membaca file.',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'concept',
      title: 'Selamat Tinggal Mouse',
      blocks: [
        {
          id: '2',
          type: 'text',
          content: 'Sebagian besar server di dunia (termasuk server web, database, dan target CTF) berjalan menggunakan Sistem Operasi Linux. Server ini biasanya tidak memiliki layar visual (GUI) yang bisa di-klik. Anda HANYA bisa berkomunikasi menggunakan teks melalui **Terminal**.'
        },
        {
          id: '3',
          type: 'text',
          content: 'Tiga perintah suci (Holy Trinity) yang paling sering digunakan:\n- `pwd` (Print Working Directory): "Saya sedang berada di folder mana sekarang?"\n- `ls` (List): "Ada file dan folder apa saja di sini?"\n- `cat` (Concatenate): "Cetak isi dari file ini ke layar."'
        }
      ]
    },
    {
      id: 'directories',
      title: 'Struktur Folder Linux',
      blocks: [
        {
          id: '4',
          type: 'alert',
          content: 'Tidak ada disk `C:\` di Linux. Semuanya berawal dari Root Directory, yang disimbolkan dengan garis miring tunggal `/`.\n\nFolder penting:\n- `/etc`: Tempat menyimpan semua file konfigurasi (mirip Control Panel).\n- `/var/log`: Tempat menyimpan catatan (log) sistem.\n- `/home`: Tempat data pengguna (seperti `C:\Users\`).',
          metadata: { type: 'info' }
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Live Lab: Terminal Simulator',
      blocks: [
        {
          id: '5',
          type: 'text',
          content: 'Tugas Anda: Anda baru saja masuk ke server target. Gunakan perintah `ls -la` untuk melihat semua file (termasuk file tersembunyi yang berawalan titik).'
        },
        {
          id: '6',
          type: 'interactive',
          content: 'MockTerminal',
          metadata: {
            component: 'MockTerminal',
            title: 'Bash Terminal (Ubuntu)',
            expectedCommand: 'ls -la',
            successOutput: `total 32
drwxr-xr-x 2 user user 4096 Oct 10 10:00 .
drwxr-xr-x 3 root root 4096 Oct 10 09:50 ..
-rw-r--r-- 1 user user  220 Oct 10 09:50 .bash_logout
-rw-r--r-- 1 user user 3771 Oct 10 09:50 .bashrc
-rw-r--r-- 1 user user  807 Oct 10 09:50 .profile
-rw-r--r-- 1 user user   33 Oct 10 10:00 secret_key.txt`,
            hint: 'Ketik: ls -la',
            flag: 'INIT0{L1nux_N00b_N0_M0r3}'
          }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_boot_1',
    type: 'flag_submission',
    question: 'Berdasarkan latihan di terminal atas, masukkan flag hadiah Anda!',
    flag: 'INIT0{L1nux_N00b_N0_M0r3}',
    hints: [
      "Perhatikan kotak terminal berwarna hitam di atas.",
      "Ketik `ls -la` di dalam terminal tersebut lalu tekan Enter.",
      "Terminal akan memunculkan teks FLAG: INIT0{...}. Salin teks tersebut."
    ],
    explanation: 'Kerja bagus! Di dunia nyata, Anda akan menggunakan perintah `cat secret_key.txt` setelah menggunakan `ls -la` untuk menemukan file tersebut.'
  }
};
