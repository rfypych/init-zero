import { CyberSecModule } from '../../../types';

export const logicErrorsModule: CyberSecModule = {
  id: 'business-logic-errors',
  slug: 'business-logic-errors',
  title: 'Business Logic Errors & Account Takeover',
  category: 'Web Exploitation',
  description: 'Mengeksploitasi cacat dalam alur logika bisnis aplikasi, bukan pada sintaks kode.',
  sections: [
    {
      id: 'concept',
      title: 'Kesalahan Logika (Logic Flaws)',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Kerentanan logika terjadi ketika aplikasi melakukan persis apa yang diperintahkan kodenya, tetapi aturan bisnisnya memiliki celah. Contoh klasik: Fitur transfer uang mengizinkan Anda mentransfer jumlah *negatif* ($-100) ke teman Anda, yang justru malah menambah saldo Anda sendiri.'
        }
      ]
    },
    {
      id: 'ato',
      title: 'Account Takeover (ATO)',
      blocks: [
        {
          id: '2',
          type: 'text',
          content: 'Seringkali ATO terjadi melalui fitur "Lupa Password". Bayangkan alur ini: Anda meminta reset password untuk `korban@mail.com`, aplikasi mengirim OTP 4 digit. Jika aplikasi tidak membatasi jumlah percobaan (Rate Limiting), hacker dapat mencoba menebak OTP dari 0000 hingga 9999 (Brute Force) dan mengambil alih akun tersebut.'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_logic_1',
    type: 'mcq',
    question: 'Mana dari berikut ini yang merupakan contoh Business Logic Error?',
    options: [
      { id: '1', text: 'Menambahkan `\' OR 1=1` di form login untuk masuk.', isCorrect: false },
      { id: '2', text: 'Membeli barang seharga $1000, mencegat HTTP request, dan mengubah parameter `price` menjadi $1 sebelum dikirim ke server.', isCorrect: true },
      { id: '3', text: 'Mengunggah file .php yang berisi web shell.', isCorrect: false },
      { id: '4', text: 'Mendapatkan error SQL syntax saat memasukkan tanda kutip tunggal.', isCorrect: false }
    ],
    explanation: 'Mengubah harga di sisi client dan server memprosesnya tanpa verifikasi ulang harga dari database adalah kegagalan logika bisnis.'
  }
};

export const apiSecurityModule: CyberSecModule = {
  id: 'owasp-api-top-10',
  slug: 'owasp-api-top-10',
  title: 'OWASP API Security Top 10 & Advanced Web',
  category: 'Web Exploitation',
  description: 'Ringkasan serangan tingkat lanjut pada arsitektur API modern, GraphQL, dan kelemahan spesifik bahasa.',
  sections: [
    {
      id: 'api-top10',
      title: 'OWASP API Top 10',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Seiring bergesernya web dari Monolitik ke API/Microservices (React + Backend API), vektor serangan bergeser. BOLA (Broken Object Level Authorization / IDOR) dan BFLA (Broken Function Level Authorization) menempati posisi teratas. Seringkali endpoint admin seperti `/api/v1/admin/users` terekspos tanpa pengecekan token JWT.'
        }
      ]
    },
    {
      id: 'graphql',
      title: 'GraphQL Injection',
      blocks: [
        {
          id: '2',
          type: 'text',
          content: 'GraphQL memungkinkan client meminta persis apa yang mereka butuhkan. Namun, jika tidak dibatasi (Introspection terbuka), hacker dapat melihat seluruh skema database. Selain itu, *Query Batching* sering disalahgunakan untuk menghindari Rate Limiting (menebak 100 password dalam 1 request HTTP).'
        }
      ]
    },
    {
      id: 'deserialization',
      title: 'Insecure Deserialization & Prototype Pollution',
      blocks: [
        {
          id: '3',
          type: 'alert',
          content: '**Insecure Deserialization** (Java/PHP/Python): Terjadi ketika data yang tidak terpercaya dikonversi kembali menjadi objek di memori. Hacker dapat memodifikasi data ini untuk mengeksekusi kode berbahaya saat objek "dibangun ulang".\n\n**Prototype Pollution** (JavaScript/Node.js): Hacker memanipulasi properti bawaan objek JS (`__proto__`) yang dapat mengubah perilaku seluruh aplikasi.',
          metadata: { type: 'danger' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_api_1',
    type: 'mcq',
    question: 'Dalam OWASP API Security, apa yang dimaksud dengan "Mass Assignment"?',
    options: [
      { id: '1', text: 'Melakukan serangan DDoS dengan mengirim banyak payload.', isCorrect: false },
      { id: '2', text: 'Kerentanan dimana hacker mengirimkan field tambahan (seperti {"is_admin": true}) pada payload JSON saat mengupdate profil, dan backend otomatis menyimpannya ke database.', isCorrect: true },
      { id: '3', text: 'Menyebarkan satu token JWT ke banyak user.', isCorrect: false },
      { id: '4', text: 'Menggunakan GraphQL untuk query banyak tabel sekaligus.', isCorrect: false }
    ],
    explanation: 'Framework backend modern sering memiliki fitur "auto-bind" JSON ke objek database. Jika developer tidak mendefinisikan whitelist (field apa saja yang boleh diubah), hacker bisa menyelipkan field sakti.'
  }
};
