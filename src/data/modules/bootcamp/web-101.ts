import { CyberSecModule } from '../../../types';

export const web101Module: CyberSecModule = {
  id: 'web-101',
  slug: 'web-101',
  title: 'How Web Works',
  category: 'Bootcamp 101',
  description: 'Membongkar apa yang sebenarnya terjadi di balik layar saat Anda mengetik URL di browser dan menekan Enter.',
  sections: [
    {
      id: 'objective',
      title: 'Mission Objective',
      blocks: [
        {
          id: '1',
          type: 'alert',
          content: 'Goal: Memahami bahasa komunikasi antara Browser Anda dengan Komputer Server di ujung sana (Protokol HTTP).',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'concept',
      title: 'Tanya Jawab HTTP',
      blocks: [
        {
          id: '2',
          type: 'text',
          content: 'Saat Anda mengunjungi `google.com`, browser Anda tidak langsung menampilkan halaman yang cantik. Browser secara rahasia mengirimkan **HTTP Request** (Surat Permintaan) kepada server Google.'
        },
        {
          id: '3',
          type: 'text',
          content: 'Lalu Server Google membalas dengan **HTTP Response** yang berisi deretan teks HTML, gambar, dan kode JavaScript. Jika balasan tersebut sukses, Server juga akan memberikan stempel berangka **200 OK**.'
        }
      ]
    },
    {
      id: 'methods',
      title: 'GET vs POST',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Ada dua cara utama browser "ngobrol" dengan server:'
        },
        {
          id: '5',
          type: 'alert',
          content: '**GET**: "Tolong kirimkan (berikan saya) halaman web ini." Digunakan saat Anda mengklik link atau mengetik URL biasa. Jika ada parameter (misalnya pencarian), itu akan tertempel di URL (contoh: `google.com/search?q=kucing`).\n\n**POST**: "Saya ingin mengirimkan data besar kepada Anda." Digunakan saat Anda mengisi formulir pendaftaran, mengupload file, atau login. Data disembunyikan di dalam *Body Request*, bukan di URL.',
          metadata: { type: 'info' }
        }
      ]
    },
    {
      id: 'tooling',
      title: 'Real-World CTF Approach (Burp Suite)',
      blocks: [
        {
          id: '6',
          type: 'text',
          content: 'Bagi pengguna biasa, proses GET/POST ini terjadi sekejap mata. Tapi seorang **Hacker** tidak akan membiarkan itu. Mereka memasang aplikasi penyadap (Proxy) seperti **Burp Suite** di tengah-tengah.'
        },
        {
          id: '7',
          type: 'code',
          content: `(Browser Anda)  ---> [Burp Suite Intercept] ---> (Server Korban)\n\n// Hacker mencegat (pause) Request HTTP sebelum sampai ke server, lalu mengubah nilainya!\nPOST /login HTTP/1.1\nHost: target.com\n\nusername=admin&password=SALAH_TAPI_DI_BYPASS`,
          metadata: { language: 'http' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_boot_2',
    type: 'mcq',
    question: 'Jika seorang developer web merancang formulir "Ganti Password", metode HTTP mana yang HARUS mereka gunakan agar password baru user tidak bocor di riwayat (history) browser melalui URL bar?',
    options: [
      { id: '1', text: 'GET', isCorrect: false },
      { id: '2', text: 'POST', isCorrect: true },
      { id: '3', text: 'OPTIONS', isCorrect: false },
      { id: '4', text: 'HEAD', isCorrect: false }
    ],
    hints: [
      "Metode pertama menempelkan semua data yang diketik user langsung di bilah URL atas browser (contoh: `web.com/change?newpass=rahasia`).",
      "Metode kedua menyembunyikan data di dalam kantong (Body) HTTP, sehingga tidak tersimpan di riwayat browser."
    ],
    explanation: 'Selalu gunakan POST untuk tindakan yang merubah state di server (seperti membuat akun atau mengubah data sensitif) agar data tidak terekspos di URL bar, server log, dan Proxy cache.'
  }
};
