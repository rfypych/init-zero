import { CyberSecModule } from '../../../types';

export const directoryTraversalModule: CyberSecModule = {
  id: 'directory-traversal',
  slug: 'directory-traversal',
  title: 'Directory Traversal & File Inclusion',
  category: 'Web Exploitation',
  description: 'Memanipulasi aplikasi web (LFI / RFI) untuk mengekstraksi file sensitif di luar direktori web yang seharusnya tidak dapat diakses.',
  sections: [
    {
      id: 'objective',
      title: 'Mission Objective',
      blocks: [
        {
          id: '1',
          type: 'alert',
          content: 'Target: Aplikasi penampil dokumen/gambar (File Viewer).\nGoal: Membaca file password sistem operasi (`/etc/passwd`) untuk mendapatkan daftar username Linux host.',
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
          content: 'Directory Traversal (juga dikenal sebagai Path Traversal) adalah cacat desain ketika aplikasi membaca file berdasarkan input dari pengguna tanpa melakukan validasi apakah file tersebut benar-benar berada di folder yang diizinkan (Base Directory).'
        },
        {
          id: '3',
          type: 'text',
          content: 'Dalam sistem Linux/Unix maupun Windows, notasi titik-titik-garis-miring `../` (Dot-Dot-Slash) adalah perintah sistem untuk "naik satu direktori ke atas". Hacker akan menggandakan notasi ini untuk "keluar" (traverse) dari folder aplikasi web (misal: `/var/www/html/images/`) dan menuju ke Root direktori sistem ( `/` ).'
        },
        {
          id: '4',
          type: 'code',
          content: `// URL yang tampak normal:\nhttp://example.com/download?file=laporan.pdf\n\n// Payload Path Traversal:\nhttp://example.com/download?file=../../../../../../etc/passwd`,
          metadata: { language: 'http' }
        }
      ]
    },
    {
      id: 'real-world-ctf',
      title: 'Real-World CTF Approach (Local File Inclusion)',
      blocks: [
        {
          id: '5',
          type: 'text',
          content: 'Kombinasi Traversal dengan Include (LFI) sangat berbahaya di bahasa seperti PHP (`include($_GET[\'page\']);`). Jika aplikasi menginklusikan file, ia juga akan *mengeksekusi* isinya sebagai kode PHP.'
        },
        {
          id: '6',
          type: 'text',
          content: 'Di lomba CTF, jika hacker menemukan Traversal tetapi file yang dibaca disensor atau ditambahi ekstensi `.php` secara otomatis, mereka akan menggunakan teknik *PHP Wrappers* (seperti `php://filter/convert.base64-encode/resource=index`) untuk memaksa server mengembalikan isi file (source code) dalam bentuk Base64 yang dapat didekode.'
        },
        {
          id: '7',
          type: 'text',
          content: 'LFI-to-RCE (Mendapatkan kontrol penuh dari LFI) juga dapat dicapai dengan teknik "Log Poisoning", di mana hacker menyisipkan Payload ke `/var/log/apache2/access.log` (via User-Agent saat HTTP Request) lalu membaca log tersebut lewat LFI!'
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Live Lab: Backend File System',
      blocks: [
        {
          id: '8',
          type: 'text',
          content: 'Aplikasi ini dirancang untuk menampilkan gambar atau dokumen teks dengan fungsi Node.js `fs.readFile()` dari folder `public_files/`. Bisakah Anda menggunakan pola `../` pada parameter `?file=` untuk keluar dari folder tersebut dan membaca file Linux `/etc/passwd`?'
        },
        {
          id: '9',
          type: 'interactive',
          content: 'MockDirTraversal',
          metadata: { component: 'MockDirTraversal' }
        }
      ]
    },
    {
      id: 'mitigation',
      title: 'The Fix (Mitigasi)',
      blocks: [
        {
          id: '10',
          type: 'text',
          content: 'Mencegah Traversal bisa dilakukan dengan menggunakan referensi indeks (misal: `?file_id=5` dipetakan ke nama file di database). Jika Anda HARUS menggunakan string nama file, pastikan untuk menggunakan fungsi resolve path dan memverifikasi bahwa *resolved path* dimulai dengan *base path* direktori yang diizinkan.'
        },
        {
          id: '11',
          type: 'code',
          content: `// Contoh mitigasi aman di Node.js\nconst BASE_DIR = path.resolve('/var/www/uploads');\nconst userPath = path.resolve(BASE_DIR, req.query.file);\n\n// Verifikasi ketat\nif (!userPath.startsWith(BASE_DIR)) {\n  return res.status(403).send('Forbidden: Path traversal attempt!');\n}`,
          metadata: { language: 'javascript' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_dt_1',
    type: 'flag_submission',
    question: 'Berdasarkan file `/etc/passwd` yang berhasil Anda baca di Live Lab atas, perhatikan detailnya baik-baik untuk menemukan Flag tersembunyi yang diletakkan di sana!',
    flag: 'INIT0{P4th_Tr4v3rs4l_M4st3r}',
    explanation: 'Target Compromised! LFI sangat mematikan di server tanpa mekanisme sandboxing yang ketat karena memberikan visibilitas penuh ke OS, seperti membaca file konfigurasi `wp-config.php` untuk mendapatkan credential database.'
  }
};
