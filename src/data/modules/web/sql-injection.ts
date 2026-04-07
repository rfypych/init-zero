import { LKSModule } from '../../../types';

export const sqlInjectionModule: LKSModule = {
  id: 'sql-injection',
  slug: 'sql-injection',
  title: 'SQL Injection (SQLi)',
  category: 'Web Exploitation',
  description: 'Memahami bagaimana input user yang tidak divalidasi dapat memanipulasi query database backend.',
  sections: [
    {
      id: 'what-is-sqli',
      title: 'Apa itu SQL Injection?',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Bayangkan Anda sedang memesan kopi di Starbucks. Anda bilang: "Satu kopi latte, **dan tolong berikan saya semua uang di kasir**". Jika kasirnya robot yang langsung melakukan apa saja yang diucapkan tanpa memfilter bagian tebal tadi, Anda baru saja melakukan "Injection".'
        },
        {
          id: '2',
          type: 'text',
          content: 'Dalam web, **SQL Injection (SQLi)** terjadi ketika aplikasi mengambil input dari user (seperti username/password) dan langsung memasukkannya ke dalam perintah (query) database tanpa disaring.'
        },
        {
          id: '3',
          type: 'alert',
          content: 'Dampaknya fatal: Hacker bisa melihat data pengguna lain (Data Breach), memanipulasi saldo, atau masuk sebagai Admin tanpa password (Authentication Bypass).',
          metadata: { type: 'danger' }
        }
      ]
    },
    {
      id: 'anatomy-of-sqli',
      title: 'Anatomi Serangan',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Mari kita lihat kode PHP jadul yang rentan. Variabel `$user` langsung ditempel ke dalam string query:'
        },
        {
          id: '5',
          type: 'code',
          content: `$query = "SELECT * FROM users WHERE username = '" . $_POST['user'] . "' AND password = '" . $_POST['pass'] . "'";`,
          metadata: { language: 'php' }
        },
        {
          id: '6',
          type: 'text',
          content: 'Apa jadinya jika hacker memasukkan `admin\' OR \'1\'=\'1` pada form username, dan membiarkan password kosong? Query di server akan berubah menjadi:'
        },
        {
          id: '7',
          type: 'code',
          content: `SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = ''`,
          metadata: { language: 'sql' }
        },
        {
          id: '8',
          type: 'text',
          content: 'Karena `1=1` itu **selalu benar**, database akan mengabaikan syarat password dan langsung memberikan akses ke akun `admin`!'
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Lab Interaktif: Authentication Bypass',
      blocks: [
        {
          id: '9',
          type: 'text',
          content: 'Coba langsung konsep di atas. Tugas Anda adalah masuk sebagai Admin tanpa mengetahui passwordnya.'
        },
        {
          id: '10',
          type: 'interactive',
          content: 'MockSQLiForm',
          metadata: { component: 'MockSQLiForm' }
        }
      ]
    },
    {
      id: 'mitigation',
      title: 'Cara Mencegah (Mitigasi)',
      blocks: [
        {
          id: '11',
          type: 'text',
          content: 'Cara terbaik mencegah SQLi adalah dengan memisahkan *query logic* dan *user data*. Gunakan **Prepared Statements (Parameterized Queries)**.'
        },
        {
          id: '12',
          type: 'code',
          content: `// Contoh aman menggunakan PDO di PHP\n$stmt = $pdo->prepare('SELECT * FROM users WHERE username = :user AND password = :pass');\n$stmt->execute(['user' => $user, 'pass' => $pass]);\n$user = $stmt->fetch();`,
          metadata: { language: 'php' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_sqli_1',
    type: 'flag_submission',
    question: 'Berdasarkan simulasi Lab Interaktif di atas, temukan flag tersembunyi dengan melakukan Authentication Bypass!',
    flag: 'INIT0{SQLi_1s_n0t_d3ad}',
    explanation: 'Selamat! Anda telah memahami konsep fundamental SQL Injection untuk melewati mekanisme login.'
  }
};
