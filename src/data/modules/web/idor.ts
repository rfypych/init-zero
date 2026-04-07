import { CyberSecModule } from '../../../types';

export const idorModule: CyberSecModule = {
  id: 'idor',
  slug: 'idor',
  title: 'Insecure Direct Object References (IDOR)',
  category: 'Web Exploitation',
  description: 'Mengeksploitasi kelemahan akses kontrol di mana aplikasi memberikan akses ke data berdasarkan parameter id tanpa verifikasi kepemilikan.',
  sections: [
    {
      id: 'concept',
      title: 'Hanya Ganti Angka Saja',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Bayangkan Anda membuka halaman struk belanja online dengan URL `https://toko.com/invoice?id=1005`. Anda melihat data belanja Anda sendiri.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Apa yang terjadi jika Anda iseng mengubah URL tersebut menjadi `?id=1006`? Jika server langsung menampilkan invoice milik orang lain tanpa mengecek apakah Anda benar-benar pemiliknya, inilah yang disebut IDOR.'
        },
        {
          id: '3',
          type: 'alert',
          content: 'IDOR sangat umum ditemukan di API (misal `/api/v1/user/123`), fitur download dokumen, atau sistem perpesanan.',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'mitigation',
      title: 'Mitigasi',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Jangan pernah mempercayai bahwa user hanya mengakses data miliknya. Di sisi server, wajib hukumnya menambahkan pengecekan otorisasi:'
        },
        {
          id: '5',
          type: 'code',
          content: `// AMAN (Node.js Express)\napp.get('/invoice/:id', (req, res) => {\n  const invoiceId = req.params.id;\n  const currentUserId = req.session.userId;\n  \n  // Query database: pastikan invoice tersebut milik user yang sedang login\n  const invoice = db.query('SELECT * FROM invoices WHERE id = ? AND owner_id = ?', [invoiceId, currentUserId]);\n});`,
          metadata: { language: 'javascript' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_idor_1',
    type: 'mcq',
    question: 'Selain menambahkan pengecekan otorisasi (Access Control) di backend, teknik lain apa yang sering digunakan untuk mempersulit eksploitasi IDOR?',
    options: [
      { id: '1', text: 'Mengenkripsi password di database', isCorrect: false },
      { id: '2', text: 'Menggunakan UUID/GUID acak sebagai ID (contoh: ?id=f47ac10b-58cc...) daripada integer berurutan (1, 2, 3...)', isCorrect: true },
      { id: '3', text: 'Menggunakan HTTPS', isCorrect: false },
      { id: '4', text: 'Mengaktifkan CORS', isCorrect: false }
    ],
    explanation: 'UUID (Universally Unique Identifier) yang panjang dan acak tidak bisa ditebak (unpredictable). Ini adalah pertahanan berlapis, meski authorization checks tetap menjadi perisai utama.'
  }
};

export const xssModule: CyberSecModule = {
  id: 'xss',
  slug: 'xss',
  title: 'Cross-Site Scripting (XSS)',
  category: 'Web Exploitation',
  description: 'Menyisipkan kode JavaScript berbahaya ke halaman web yang dilihat oleh pengguna lain.',
  sections: [
    {
      id: 'concept',
      title: 'Ketika Browser Dibohongi',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'XSS terjadi saat aplikasi web menampilkan input (misalnya komentar blog atau profil user) tanpa melakukan filter (sanitasi) terhadap tag HTML.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Hacker memasukkan teks berupa script: `<script>alert("Hacked!")</script>`. Ketika pengguna (atau Admin) lain membuka halaman tersebut, browser mereka mengira script itu adalah bagian sah dari website dan menjalankannya.'
        }
      ]
    },
    {
      id: 'impact',
      title: 'Dampak XSS',
      blocks: [
        {
          id: '3',
          type: 'alert',
          content: 'Meski hanya berjalan di browser (frontend), dampaknya sangat fatal:\n- Pencurian Session/Cookies (Account Takeover)\n- Keylogging (merekam ketikan password)\n- Phishing Palsu (menampilkan form login palsu di atas web asli)',
          metadata: { type: 'danger' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_xss_1',
    type: 'mcq',
    question: 'Tipe XSS yang muatannya disimpan secara permanen di database server (misalnya melalui postingan forum) lalu dieksekusi ketika korban membuka halaman forum tersebut disebut?',
    options: [
      { id: '1', text: 'Reflected XSS', isCorrect: false },
      { id: '2', text: 'DOM-based XSS', isCorrect: false },
      { id: '3', text: 'Stored XSS / Persistent XSS', isCorrect: true },
      { id: '4', text: 'Blind XSS', isCorrect: false }
    ],
    explanation: 'Stored XSS sangat berbahaya karena target korbannya adalah siapa saja yang mengunjungi halaman yang sudah ditanami script berbahaya di server.'
  }
};
