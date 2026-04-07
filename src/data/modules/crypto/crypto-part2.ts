import { CyberSecModule } from '../../../types';

export const rsaModule: CyberSecModule = {
  id: 'attack-on-rsa',
  slug: 'attack-on-rsa',
  title: 'Attack on RSA',
  category: 'Offensive / Red Team Based CTF',
  description: 'Mengeksploitasi kelemahan dalam implementasi algoritma asimetris RSA.',
  sections: [
    {
      id: 'concept',
      title: 'Dasar RSA',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'RSA didasarkan pada kesulitan memfaktorkan perkalian dua bilangan prima yang sangat besar ($N = p \\times q$). Public Key terdiri dari modulus $N$ dan eksponen $e$ (biasanya 65537). Private Key adalah eksponen dekripsi $d$.'
        }
      ]
    },
    {
      id: 'attacks',
      title: 'Vektor Serangan CTF',
      blocks: [
        {
          id: '2',
          type: 'alert',
          content: '**1. Small N (Faktorisasi Langsung)**: Jika $N$ terlalu kecil (misal < 256-bit), kita bisa memfaktorkannya langsung dengan alat seperti yafu atau Alpertron.\n\n**2. Hastad Broadcast Attack**: Terjadi jika pesan yang sama dienkripsi dan dikirim ke banyak penerima dengan eksponen $e$ yang kecil (contoh $e=3$).\n\n**3. Common Modulus Attack**: Terjadi jika dua pihak membagikan nilai $N$ yang sama tetapi menggunakan nilai $e$ yang berbeda untuk mengenkripsi pesan yang sama.',
          metadata: { type: 'info' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_rsa_1',
    type: 'mcq',
    question: 'Jika dalam sebuah tantangan CTF Anda diberikan public key RSA dengan nilai eksponen e = 3, dan cipher text (C) yang nilainya belum di-modulo N (karena pesan M terlalu kecil), serangan apa yang paling mudah dilakukan?',
    options: [
      { id: '1', text: 'Wiener Attack', isCorrect: false },
      { id: '2', text: 'Cube Root Attack (mengambil akar pangkat 3 dari C)', isCorrect: true },
      { id: '3', text: 'Common Modulus Attack', isCorrect: false },
      { id: '4', text: 'Fermat Factorization', isCorrect: false }
    ],
    explanation: 'Jika M^e < N, maka operasi modulo N tidak pernah terjadi. Karena e=3, kita cukup mencari akar pangkat tiga dari Cipher text untuk mendapatkan Plain text (M).'
  }
};

export const prngModule: CyberSecModule = {
  id: 'attack-on-prng',
  slug: 'attack-on-prng',
  title: 'Attack on PRNG',
  category: 'Offensive / Red Team Based CTF',
  description: 'Memprediksi angka acak dengan mengeksploitasi Pseudo-Random Number Generators yang lemah.',
  sections: [
    {
      id: 'concept',
      title: 'Tidak Ada yang Benar-Benar Acak',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Komputer tidak bisa menghasilkan angka acak murni; mereka menggunakan fungsi matematika kompleks (PRNG) yang membutuhkan "Seed" (nilai awal).'
        },
        {
          id: '2',
          type: 'text',
          content: 'Jika fungsi PRNG tidak aman secara kriptografi (misalnya `rand()` di C atau `random` di Python yang menggunakan Mersenne Twister), maka hacker dapat memprediksi angka selanjutnya.'
        }
      ]
    },
    {
      id: 'attacks',
      title: 'Mersenne Twister & LCG',
      blocks: [
        {
          id: '3',
          type: 'alert',
          content: '**Mersenne Twister (MT19937)**: Digunakan oleh Python. Jika hacker bisa mendapatkan 624 output angka acak berturut-turut, mereka bisa "mengkloning" status internal generator dan menebak angka acak selanjutnya dengan presisi 100%.\n\n**LCG (Linear Congruential Generator)**: Digunakan di Java `Math.random()`. Dapat dipecahkan hanya dengan beberapa observasi output.',
          metadata: { type: 'info' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_prng_1',
    type: 'mcq',
    question: 'Jika Anda harus membuat token rahasia untuk reset password (sebuah fitur keamanan kritis) di Python, modul apa yang HARUS Anda gunakan untuk mencegah serangan prediksi PRNG?',
    options: [
      { id: '1', text: 'import random', isCorrect: false },
      { id: '2', text: 'import secrets', isCorrect: true },
      { id: '3', text: 'import math', isCorrect: false },
      { id: '4', text: 'time.time()', isCorrect: false }
    ],
    explanation: 'Modul `secrets` di Python dirancang khusus untuk menghasilkan angka acak yang aman secara kriptografi (CSPRNG), sedangkan `random` menggunakan Mersenne Twister yang bisa diprediksi.'
  }
};

export const aesModule: CyberSecModule = {
  id: 'attack-on-aes',
  slug: 'attack-on-aes',
  title: 'Attack on AES & Block Ciphers',
  category: 'Offensive / Red Team Based CTF',
  description: 'Mengeksploitasi kelemahan dalam mode operasi AES seperti ECB dan CBC.',
  sections: [
    {
      id: 'ecb',
      title: 'Bahaya Mode ECB',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'AES adalah Block Cipher (mengenkripsi per 16 byte blok). Mode operasi paling primitif adalah ECB (Electronic Codebook), di mana blok data yang sama akan selalu menghasilkan blok cipher yang sama persis.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Kelemahan fatal ECB: Pola gambar (misalnya maskot Linux Tux) akan tetap terlihat bentuknya meski sudah dienkripsi. Di web, attacker bisa memotong dan menempelkan (Cut & Paste) blok cipher untuk memanipulasi struktur data (misal: memindah blok "admin=0" menjadi "admin=1").'
        }
      ]
    },
    {
      id: 'cbc-padding',
      title: 'CBC Padding Oracle Attack',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Mode CBC (Cipher Block Chaining) jauh lebih aman karena menggunakan rantai XOR. Namun, ia rentan terhadap Padding Oracle Attack.'
        },
        {
          id: '4',
          type: 'text',
          content: 'Jika server memberikan pesan error yang berbeda ketika dekripsi gagal karena "Padding salah" versus "MAC salah", hacker bisa menembakkan ribuan payload yang sedikit dimodifikasi untuk mendekripsi pesan tanpa mengetahui kunci AES sama sekali!'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_aes_1',
    type: 'mcq',
    question: 'Mode operasi Block Cipher mana yang direkomendasikan saat ini karena menggabungkan enkripsi dan autentikasi data (AEAD) sehingga kebal terhadap Padding Oracle Attack?',
    options: [
      { id: '1', text: 'AES-ECB', isCorrect: false },
      { id: '2', text: 'AES-CBC', isCorrect: false },
      { id: '3', text: 'AES-GCM', isCorrect: true },
      { id: '4', text: 'AES-CFB', isCorrect: false }
    ],
    explanation: 'GCM (Galois/Counter Mode) menyediakan kerahasiaan sekaligus integritas/autentikasi data (MAC terintegrasi), sehingga jika cipher text diubah sedikit saja, dekripsi akan langsung menolak secara keseluruhan.'
  }
};

export const hashModule: CyberSecModule = {
  id: 'hashing-length-extension',
  slug: 'hashing-length-extension',
  title: 'Hashing & Length Extension Attack',
  category: 'Offensive / Red Team Based CTF',
  description: 'Mengeksploitasi arsitektur konstruksi hash lawas (Merkle-Damgard) untuk memalsukan signature.',
  sections: [
    {
      id: 'concept',
      title: 'Length Extension Attack',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Algoritma hash lawas seperti MD5, SHA-1, dan SHA-2 (SHA-256/512) menggunakan konstruksi Merkle-DamgÃ¥rd.'
        },
        {
          id: '2',
          type: 'alert',
          content: 'Kelemahannya: Jika sebuah API menggunakan `Hash(SECRET + DATA)` sebagai signature untuk memvalidasi `DATA`, seorang attacker dapat mengambil hash tersebut dan menghitung hash baru untuk `SECRET + DATA + DATA_TAMBAHAN` TANPA perlu mengetahui apa isi `SECRET` tersebut!',
          metadata: { type: 'danger' }
        }
      ]
    },
    {
      id: 'mitigation',
      title: 'HMAC sebagai Solusi',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Ini sebabnya Anda tidak boleh merakit fungsi autentikasi/signature sendiri. Untuk menggunakan MD5/SHA256 dengan aman bersama sebuah secret key, Anda HARUS menggunakan konstruksi **HMAC** (Hash-based Message Authentication Code).'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_hash_1',
    type: 'mcq',
    question: 'Algoritma keluarga SHA mana yang TIDAK rentan terhadap Length Extension Attack karena menggunakan konstruksi Sponge function?',
    options: [
      { id: '1', text: 'SHA-1', isCorrect: false },
      { id: '2', text: 'SHA-256', isCorrect: false },
      { id: '3', text: 'SHA-3 (Keccak)', isCorrect: true },
      { id: '4', text: 'MD4', isCorrect: false }
    ],
    explanation: 'SHA-3 menggunakan arsitektur yang sama sekali baru (Sponge construction) yang secara inheren kebal terhadap serangan Length Extension.'
  }
};
