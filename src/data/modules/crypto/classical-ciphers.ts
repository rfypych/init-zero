import { CyberSecModule } from '../../../types';

export const classicalCiphersModule: CyberSecModule = {
  id: 'classical-ciphers',
  slug: 'classical-ciphers',
  title: 'Classical Ciphers',
  category: 'Offensive / Red Team Based CTF',
  description: 'Memahami dan memecahkan algoritma enkripsi klasik seperti Caesar, Vigenere, Atbash, dan XOR.',
  sections: [
    {
      id: 'concept',
      title: 'Masa Lalu Kriptografi',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Sebelum ada komputer bertenaga tinggi, enkripsi dilakukan dengan memanipulasi huruf secara matematis sederhana. Ini dikenal sebagai Classical Ciphers.'
        },
        {
          id: '2',
          type: 'text',
          content: 'Walaupun sekarang sangat mudah dipecahkan (rentan terhadap Brute Force atau Frequency Analysis), memahami cipher klasik adalah fondasi penting untuk belajar kriptografi modern.'
        }
      ]
    },
    {
      id: 'caesar-cipher',
      title: 'Caesar Cipher',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Dinamakan dari Julius Caesar, algoritma ini sangat sederhana: menggeser setiap huruf alfabet sebanyak N posisi (disebut juga ROT / Rotation cipher).'
        },
        {
          id: '4',
          type: 'alert',
          content: 'Contoh dengan Shift = 3 (ROT3):\nHuruf A menjadi D\nHuruf B menjadi E\nHuruf Z kembali memutar menjadi C',
          metadata: { type: 'info' }
        }
      ]
    },
    {
      id: 'interactive-simulator',
      title: 'Lab Interaktif: Caesar Decoder',
      blocks: [
        {
          id: '5',
          type: 'text',
          content: 'Pesan rahasia di bawah ini dienkripsi menggunakan Caesar Cipher. Coba tebak dan geser nilai ROT-nya sampai teks tersebut bisa dibaca.'
        },
        {
          id: '6',
          type: 'interactive',
          content: 'MockCipherSolver',
          metadata: { component: 'MockCipherSolver' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_crypto_1',
    type: 'flag_submission',
    question: 'Dekripsi pesan pada simulator di atas. Masukkan flag yang Anda dapatkan (termasuk INIT0{...}):',
    flag: 'INIT0{Caesar_Cipher_Isawesome}',
    explanation: 'Selamat! Cipher yang hanya memiliki sedikit ruang kunci (seperti Caesar dengan maksimal 25 kemungkinan geseran) sangat rapuh terhadap Brute Force Attack.'
  }
};
