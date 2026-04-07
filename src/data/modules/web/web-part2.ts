import { CyberSecModule } from '../../../types';

export const csrfModule: CyberSecModule = {
  id: 'csrf',
  slug: 'csrf',
  title: 'Cross-Site Request Forgery (CSRF)',
  category: 'Web Exploitation',
  description: 'Memaksa browser pengguna untuk melakukan aksi yang tidak diinginkan di situs web tempat mereka sedang login.',
  sections: [
    {
      id: 'concept',
      title: 'Meminjam Sesi Pengguna',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Browser secara otomatis selalu mengirimkan Cookies (termasuk Session Cookie) ke domain asalnya, tidak peduli dari mana request tersebut berasal.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Jika hacker membuat web palsu (`hacker.com`) yang berisi form auto-submit ke `bank.com/transfer?to=hacker&amount=100`, dan pengguna (yang sedang login di bank.com) mengunjungi `hacker.com`, maka browser akan melakukan transfer tersebut menggunakan Session milik pengguna secara diam-diam.'
        }
      ]
    },
    {
      id: 'mitigation',
      title: 'Anti-CSRF Tokens',
      blocks: [
        {
          id: '3',
          type: 'alert',
          content: 'Untuk mencegah CSRF, aplikasi harus memastikan bahwa request benar-benar berasal dari UI mereka sendiri, bukan web eksternal. Ini dilakukan dengan menyisipkan nilai acak (Anti-CSRF Token) ke dalam form HTML yang juga dicek di sisi server.',
          metadata: { type: 'info' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_csrf_1',
    type: 'mcq',
    question: 'Atribut Cookie modern apa yang paling efektif secara native mencegah sebagian besar serangan CSRF dengan melarang browser mengirimkan cookie melalui request lintas situs (cross-site)?',
    options: [
      { id: '1', text: 'Secure', isCorrect: false },
      { id: '2', text: 'HttpOnly', isCorrect: false },
      { id: '3', text: 'SameSite (Strict / Lax)', isCorrect: true },
      { id: '4', text: 'Max-Age', isCorrect: false }
    ],
    explanation: 'Atribut SameSite=Lax (sekarang default di browser modern) atau SameSite=Strict memastikan Cookie hanya dikirim jika request berasal dari domain yang sama.'
  }
};

export const fileUploadModule: CyberSecModule = {
  id: 'insecure-file-upload',
  slug: 'insecure-file-upload',
  title: 'Insecure File Upload',
  category: 'Web Exploitation',
  description: 'Mengeksploitasi fitur unggah file untuk mendapatkan eksekusi kode jarak jauh (RCE) via Web Shell.',
  sections: [
    {
      id: 'concept',
      title: 'Mengunggah Web Shell',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Fitur ganti foto profil adalah celah klasik. Jika aplikasi hanya mengecek ekstensi menggunakan JavaScript di frontend, atau hanya mengecek MIME Type, hacker dapat dengan mudah mem-bypassnya menggunakan Burp Suite.'
        },
        {
          id: '2',
          type: 'code',
          content: `// shell.php\n<?php system($_GET['cmd']); ?>`,
          metadata: { language: 'php' }
        },
        {
          id: '3',
          type: 'text',
          content: 'Hacker mengunggah file `shell.php` (mungkin disamarkan menjadi `shell.php.jpg`), lalu mengaksesnya secara langsung di browser `http://web.com/uploads/shell.php?cmd=whoami`. Boom, server berhasil diambil alih (RCE).'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_upload_1',
    type: 'mcq',
    question: 'Manakah dari metode validasi file upload berikut yang PALING AMAN untuk diterapkan di backend?',
    options: [
      { id: '1', text: 'Mengecek isi header Content-Type (MIME Type) pada request HTTP', isCorrect: false },
      { id: '2', text: 'Mengecek akhiran ekstensi file (misal .jpg atau .png)', isCorrect: false },
      { id: '3', text: 'Menggunakan library backend untuk memeriksa Magic Bytes file dan merender ulang/strip metadata gambar tersebut', isCorrect: true },
      { id: '4', text: 'Mengecek ukuran file (Max Size)', isCorrect: false }
    ],
    explanation: 'Content-Type dan Ekstensi file sangat mudah dimanipulasi oleh attacker. Memeriksa isi asli file (Magic bytes) dan memproses ulang file (Image Stripping) adalah cara teraman.'
  }
};

export const jwtModule: CyberSecModule = {
  id: 'jwt',
  slug: 'jwt',
  title: 'JSON Web Token (JWT) Attacks',
  category: 'Web Exploitation',
  description: 'Memanipulasi struktur JWT untuk melakukan eskalasi hak istimewa (Privilege Escalation).',
  sections: [
    {
      id: 'concept',
      title: 'Struktur JWT',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'JWT terdiri dari 3 bagian yang dipisahkan oleh titik: `Header.Payload.Signature`. Header dan Payload HANYA di-encode menggunakan Base64 (BUKAN dienkripsi), artinya siapapun bisa membacanya.'
        },
        {
          id: '2',
          type: 'alert',
          content: 'Signature adalah bagian penting. Server membuatnya dengan menggabungkan Header + Payload + SECRET_KEY. Jika Payload diubah oleh user, Signature tidak akan cocok (invalid) KECUALI server salah dikonfigurasi.',
          metadata: { type: 'warning' }
        }
      ]
    },
    {
      id: 'attacks',
      title: 'Serangan Umum pada JWT',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: '**1. Alg None Attack:** Hacker mengubah bagian algoritma di Header menjadi `{"alg": "none"}` dan menghapus bagian Signature. Beberapa server lama akan menerimanya sebagai valid.\n\n**2. Weak Secret Cracking:** Jika SECRET_KEY server sangat lemah (misal: "rahasia123"), hacker bisa menggunakan tool seperti `hashcat` atau `jwt_tool` untuk memecahkannya (brute-force) secara offline, lalu membuat token Admin mereka sendiri.'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_jwt_1',
    type: 'flag_submission',
    question: 'Jika bagian PAYLOAD dari sebuah JWT adalah `eyJ1c2VyIjoiYWRtaW4ifQ`, apakah isi asli dari payload tersebut? (Gunakan tools Base64 Decode)',
    flag: '{"user":"admin"}',
    explanation: 'Benar! JWT Payload hanyalah string JSON biasa yang di-encode Base64. Ingat, Base64 encoding BUKANLAH enkripsi.'
  }
};

export const sstiModule: CyberSecModule = {
  id: 'ssti',
  slug: 'ssti',
  title: 'Server Side Template Injection (SSTI)',
  category: 'Web Exploitation',
  description: 'Mengeksekusi kode di server melalui celah pada Template Engine seperti Jinja2 (Python) atau Twig (PHP).',
  sections: [
    {
      id: 'concept',
      title: 'Ketika Template Berpikir Sendiri',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Framework web modern sering menggunakan Template Engine untuk merender HTML dinamis. Jika input pengguna digabungkan langsung ke dalam *string template* sebelum dirender, pengguna dapat menyisipkan sintaks template.'
        },
        {
          id: '2',
          type: 'code',
          content: `// Python Flask (Jinja2) yang VULNERABLE\n@app.route('/hello')\ndef hello():\n    name = request.args.get('name')\n    # Input user langsung dimasukkan ke struktur template!\n    template = f"<h1>Hello {name}</h1>"\n    return render_template_string(template)`,
          metadata: { language: 'python' }
        }
      ]
    },
    {
      id: 'exploitation',
      title: 'Mendapatkan RCE',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Jika hacker mengunjungi `/hello?name={{7*7}}` dan layar menampilkan **Hello 49**, maka itu positif SSTI. Dari sini, hacker akan menelusuri hirarki objek bawaan Python (seperti `__class__`, `__mro__`, `__subclasses__`) untuk memanggil modul `os` dan mendapatkan Remote Command Execution (RCE).'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_ssti_1',
    type: 'mcq',
    question: 'Jika input {{7*7}} tidak tereksekusi dan hanya dirender sebagai teks biasa "{{7*7}}" di layar, namun input ${7*7} tereksekusi menjadi 49, kemungkinan besar aplikasi tersebut ditulis menggunakan bahasa/framework apa?',
    options: [
      { id: '1', text: 'Python (Jinja2)', isCorrect: false },
      { id: '2', text: 'Java (FreeMarker/Velocity) atau Node.js', isCorrect: true },
      { id: '3', text: 'PHP (Twig)', isCorrect: false },
      { id: '4', text: 'Ruby (ERB)', isCorrect: false }
    ],
    explanation: 'Sintaks ${} umum digunakan pada template engine berbasis Java atau JavaScript (Template Literals), sedangkan {{}} sangat ikonik untuk Python Jinja2 atau PHP Twig.'
  }
};
