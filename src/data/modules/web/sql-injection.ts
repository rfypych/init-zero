import { CyberSecModule } from '../../../types';

export const sqlInjectionModule: CyberSecModule = {
  id: 'sql-injection',
  slug: 'sql-injection',
  title: 'SQL Injection (SQLi)',
  category: 'Web Exploitation',
  description: 'Memahami dan mengeksploitasi celah di mana input user secara langsung memodifikasi query database backend, mengizinkan Authentication Bypass hingga eksekusi RCE.',
  sections: [
    {
      id: 'objective',
      title: 'Mission Objective',
      blocks: [
        {
          id: '1',
          type: 'alert',
          content: 'Target: Panel Login Admin Internal.\nGoal: Masuk sebagai administrator tanpa mengetahui password asli.',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'what-is-sqli',
      title: 'The Vulnerability (TL;DR)',
      blocks: [
        {
          id: '2',
          type: 'text',
          content: 'Dalam web, **SQL Injection (SQLi)** terjadi ketika aplikasi mengambil input dari user (seperti form username/password) dan langsung menyambungkannya (concatenation) ke dalam baris perintah database (SQL) tanpa di-filter atau di-escape.'
        },
        {
          id: '3',
          type: 'text',
          content: 'Akibatnya, database tidak bisa membedakan mana yang merupakan "Data" (input user) dan mana yang merupakan "Kode" (perintah SQL asli). User dapat memasukkan karakter penutup string (seperti tanda kutip tunggal) lalu menulis perintah SQL mereka sendiri di sebelahnya.'
        }
      ]
    },
    {
      id: 'anatomy-of-sqli',
      title: 'Anatomi Serangan (Authentication Bypass)',
      blocks: [
        {
          id: '4',
          type: 'text',
          content: 'Perhatikan potongan kode backend (Node.js/PHP) yang rentan di bawah ini:'
        },
        {
          id: '5',
          type: 'code',
          content: "// string query dibangun langsung dari input body HTTP request\nconst query = \"SELECT * FROM users WHERE username = '\" + req.body.user + \"' AND password = '\" + req.body.pass + \"'\";\ndb.execute(query);",
          metadata: { language: 'javascript' }
        },
        {
          id: '6',
          type: 'text',
          content: "Apa jadinya jika hacker memasukkan `admin' OR '1'='1` pada form username, dan membiarkan password kosong?"
        },
        {
          id: '7',
          type: 'code',
          content: "SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = ''",
          metadata: { language: 'sql' }
        },
        {
          id: '8',
          type: 'text',
          content: 'Database membaca logika ini sebagai: "Berikan saya data user di mana usernamenya adalah admin, ATAU di mana 1 sama dengan 1". Karena 1=1 itu adalah pernyataan matematika yang **selalu benar (TRUE)**, seluruh logika evaluasi password diabaikan, dan database akan langsung mereturn baris pertama tabel (yang biasanya adalah akun admin)!'
        }
      ]
    },
    {
      id: 'real-world-ctf',
      title: 'Real-World CTF Approach (Tooling)',
      blocks: [
        {
          id: '13',
          type: 'text',
          content: 'Di kompetisi CTF nyata, Anda akan sering berhadapan dengan *Blind SQLi* (di mana error tidak ditampilkan di layar) atau *Union-Based SQLi* (untuk membaca isi tabel lain). Tools otomatis seperti **SQLMap** sangat krusial.'
        },
        {
          id: '14',
          type: 'code',
          content: "# Menyimpan request login yang dicegat via Burp Suite ke file req.txt\n# Lalu memerintahkan SQLMap untuk mengeksploitasinya secara otomatis\nsqlmap -r req.txt --dbs --batch --random-agent\n\n# Jika database ditemukan (misal: \"ctf_db\"), dump seluruh isinya:\nsqlmap -r req.txt -D ctf_db --dump-all",
          metadata: { language: 'bash' }
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Live Lab: Backend Execution',
      blocks: [
        {
          id: '9',
          type: 'text',
          content: 'Simulator di bawah ini sekarang **BUKAN MOCKING FRONTEND**. Ia benar-benar mengirim request HTTP POST `application/json` ke backend Node.js + SQLite di localhost Anda. Coba lakukan *Authentication Bypass* dengan memanipulasi form.'
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
      title: 'The Fix (Mitigasi)',
      blocks: [
        {
          id: '11',
          type: 'text',
          content: 'Satu-satunya cara ampuh 100% untuk mencegah SQLi adalah dengan memisahkan *Query Logic* dan *User Data* secara total di level protokol database. Ini disebut **Prepared Statements (Parameterized Queries)**.'
        },
        {
          id: '12',
          type: 'code',
          content: "// Contoh AMAN menggunakan Parameterized Queries di Node.js (sqlite3)\nconst stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');\nstmt.get([username, password], (err, row) => { ... });",
          metadata: { language: 'javascript' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_sqli_1',
    type: 'flag_submission',
    question: 'Berdasarkan Live Lab di atas, temukan flag tersembunyi dengan masuk sebagai administrator menggunakan injeksi `OR 1=1`!',
    flag: 'INIT0{Un10n_B4s3d_M4st3r}',
    hints: ['Scroll ke atas ke bagian Live Lab.', 'Ketik kata `admin` di kolom Username.', 'Tambahkan teks `\' OR \'1\'=\'1` setelah kata admin tersebut sehingga menjadi `admin\' OR \'1\'=\'1`.', 'Kosongkan password dan klik Login.'],
    explanation: 'Target Compromised! Anda berhasil memanipulasi logika boolean SQL. Dalam skenario nyata, serangan Union-Based dapat digunakan untuk membongkar tabel `users` untuk mengekstrak hash password secara massal.'
  }
};
