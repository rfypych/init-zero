import { LKSModule } from '../../../types';

export const compiledLangModule: LKSModule = {
  id: 'compiled-language-syntax',
  slug: 'compiled-language-syntax',
  title: 'Compiled Language Syntax & Frameworks',
  category: 'Reverse Engineering',
  description: 'Mengenali perbedaan antara binary yang dikompilasi dari C/C++, Golang, Rust, atau framework khusus seperti Flutter dan Kotlin.',
  sections: [
    {
      id: 'concept',
      title: 'Tidak Semua Biner Diciptakan Sama',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Jika Anda me-reverse program murni C, kodenya biasanya kecil dan mudah dibaca (bergantung pada fungsi `libc`). Namun, bahasa modern menanamkan banyak "sampah" ke dalam binary.'
        }
      ]
    },
    {
      id: 'languages',
      title: 'Karakteristik Bahasa Modern',
      blocks: [
        {
          id: '2',
          type: 'alert',
          content: '**Golang**: Binary-nya berukuran besar (statically linked), menggunakan Goroutines, dan memiliki mekanisme passing argumen lewat stack (versi Go lama) atau register (Go baru). Terdapat runtime besar bawaan Go.\n\n**Rust**: Sering memiliki fungsi dengan nama yang sangat panjang (name mangling) dan pengecekan keamanan batas (bounds checking) yang tebal (seperti memanggil fungsi `panic`).\n\n**Flutter / Dart**: Sangat sulit di-reverse secara tradisional karena Dart AOT (Ahead of Time) mengkompilasinya menjadi format snapshot mesin virtual Dart khusus.',
          metadata: { type: 'info' }
        }
      ]
    }
  ],
  quiz: {
    id: 'q_re4_1',
    type: 'mcq',
    question: 'Biner yang dikompilasi menggunakan Golang seringkali berukuran jauh lebih besar (megabytes) dibandingkan biner C biasa (kilobytes). Apa alasan utamanya?',
    options: [
      { id: '1', text: 'Golang tidak melakukan optimasi kode.', isCorrect: false },
      { id: '2', text: 'Golang secara default melakukan "Static Linking", memasukkan seluruh library dan Go Runtime (Garbage Collector, Scheduler) ke dalam satu file biner.', isCorrect: true },
      { id: '3', text: 'Golang menyimpan source code aslinya di dalam biner.', isCorrect: false },
      { id: '4', text: 'Karena dienkripsi.', isCorrect: false }
    ],
    explanation: 'Biner statically linked tidak membutuhkan library eksternal (seperti libc.so di OS host), menjadikannya portabel namun berukuran masif.'
  }
};

export const mobileReModule: LKSModule = {
  id: 'mobile-re',
  slug: 'mobile-re',
  title: 'Mobile Reverse Engineering & Obfuscation',
  category: 'Reverse Engineering',
  description: 'Membedah aplikasi Android (APK) dan teknik penyembunyian kode (Obfuscation).',
  sections: [
    {
      id: 'apk',
      title: 'Anatomi File APK',
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'File APK Android pada dasarnya adalah file ZIP. Di dalamnya terdapat file `classes.dex` yang merupakan bytecode Dalvik (Java/Kotlin yang dikompilasi).'
        },
        {
          id: '2',
          type: 'text',
          content: 'Tools utama yang digunakan adalah **JADX** atau **Apktool** untuk mendekompilasi `.dex` kembali menjadi kode sumber Java yang bisa dibaca.'
        }
      ]
    },
    {
      id: 'obfuscation',
      title: 'Obfuscation (Penyandian Kode)',
      blocks: [
        {
          id: '3',
          type: 'text',
          content: 'Developer aplikasi sering menggunakan tools seperti ProGuard untuk "mengacak" kode mereka. Nama variabel seperti `checkPassword()` akan diubah menjadi huruf tak bermakna seperti `a()`, membuatnya sangat pusing dibaca manusia.'
        },
        {
          id: '4',
          type: 'text',
          content: 'Selain nama diubah, struktur logika (control flow) juga bisa dibuat berputar-putar. Analis harus menggunakan kemampuan statik dan dinamis (seperti instrumentasi Frida) untuk membongkarnya.'
        }
      ]
    }
  ],
  quiz: {
    id: 'q_re5_1',
    type: 'mcq',
    question: 'Tool Dynamic Instrumentation populer apa yang sering digunakan di Mobile RE untuk mem-hook fungsi Java (misalnya fungsi SSL Pinning) pada Android dan mengubah return value-nya secara real-time tanpa perlu me-recompile APK?',
    options: [
      { id: '1', text: 'Ghidra', isCorrect: false },
      { id: '2', text: 'JADX', isCorrect: false },
      { id: '3', text: 'Frida', isCorrect: true },
      { id: '4', text: 'Wireshark', isCorrect: false }
    ],
    explanation: 'Frida memanipulasi aplikasi secara dinamis saat berjalan (injecting JS scripts into native apps), sangat handal untuk bypass SSL Pinning atau Root Detection di Android.'
  }
};
